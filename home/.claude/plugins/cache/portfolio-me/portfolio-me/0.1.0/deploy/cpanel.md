# Deploy — cPanel / shared hosting

**When to pick this:** the subject already pays for shared hosting, the domain lives there, and moving it is not on the table.

---

## Prerequisites

| Need | Check |
|---|---|
| cPanel login | The host's control panel URL, in the human's hands |
| FTPS or SFTP credentials | Created in cPanel under **FTP Accounts** |
| `lftp` locally | `lftp --version` |
| The document root path | Usually `/public_html`, confirmed in **File Manager** |
| A built site directory | `ls dist/index.html` |

Confirm the transport before anything else. Plain FTP sends the password in
cleartext across every hop between here and the host.

```bash
# FTPS: expect "234 AUTH TLS successful" or similar
lftp -c "set ftp:ssl-force true; set ssl:verify-certificate true; \
         open -u <user>,<pass> ftp://<host>; ls" 
```

If FTPS fails and only plain FTP works, stop and tell the human. Either the host
enables FTPS or SFTP, or they accept that the credential travels in the clear
and rotates immediately after. That is their decision to make, not one to make
quietly.

Credentials go in `~/.netrc` with mode `600`, or in an environment variable read
at call time. Never in the repository, never in a command that gets logged,
never echoed into the transcript (`§15`).

```bash
chmod 600 ~/.netrc          # machine <host> login <user> password <pass>
```

## Snapshot

**Hard rule (`§15`). No snapshot, no deploy.** Shared hosting has no deploy
history and no undo. The downloaded copy is the only rollback that exists.

```bash
mkdir -p runs/<slug>/snapshot/public_html
STAMP=$(date -u +%Y%m%dT%H%M%SZ)

lftp -c "set ftp:ssl-force true; open <host>; \
         mirror --verbose --parallel=4 /public_html \
         runs/<slug>/snapshot/public_html"

tar czf runs/<slug>/snapshot/public_html-$STAMP.tar.gz \
  -C runs/<slug>/snapshot public_html
echo "runs/<slug>/snapshot/public_html-$STAMP.tar.gz" > runs/<slug>/rollback-ref.txt
```

Verify the download is real before overwriting anything:

```bash
find runs/<slug>/snapshot/public_html -type f | wc -l
du -sh runs/<slug>/snapshot/public_html
```

Zero files means the path is wrong, not that the account is empty. Check the
addon-domain path before continuing.

## Deploy

```bash
lftp -c "set ftp:ssl-force true; set ssl:verify-certificate true; \
         open <host>; \
         mirror --reverse --verbose --parallel=4 \
           --exclude-glob .git* \
           --exclude-glob .htaccess \
           dist/ /public_html"
```

`--reverse` uploads. Omitting it downloads over the local build, which is a bad
five minutes. Do a dry run first:

```bash
lftp -c "open <host>; mirror --reverse --dry-run --delete dist/ /public_html"
```

`--delete` is off above on purpose. Shared hosting document roots collect files
nobody remembers putting there, including `.well-known/` used for certificate
validation and host-managed scripts. Add `--delete` only after reading the dry
run in full.

`.htaccess`, uploaded once by hand and excluded from the mirror so a deploy
never drops it:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

ErrorDocument 404 /404.html
```

Verify with eyes, not a status code (`§14`).

## Rollback

```bash
lftp -c "set ftp:ssl-force true; open <host>; \
         mirror --reverse --delete --verbose \
           runs/<slug>/snapshot/public_html/ /public_html"
```

`--delete` is correct here and only here: the goal is to make the remote match
the snapshot exactly, including removing files this deploy added.

Faster path when the panel is reachable: **File Manager → select `public_html`
→ Compress**, then upload the snapshot archive and **Extract** over it. Fewer
round trips than FTP on a large site, and it is the fallback when the FTP
account itself is the thing that broke.

Confirm:

```bash
curl -sI https://<domain>/ | head -1
```

## Domain and TLS

The domain usually already points at the host. Confirm before touching DNS:

```bash
dig +short <domain>
dig +short www.<domain>
```

`A` records for apex and `www` at the shared IP shown in cPanel's sidebar. Most
hosts include AutoSSL, which issues a free certificate and renews it on its own.
Find it in **Security → SSL/TLS Status**, select both hostnames, and run
**Run AutoSSL**. It needs the domain resolving to the host first, and it needs
`/.well-known/` reachable, which is why the mirror excludes nothing under that
path.

Some hosts sell certificates instead of running AutoSSL. Free issuance exists;
say so plainly rather than letting a subject buy a certificate they do not need.

The `.htaccess` rules above own the `http` to `https` redirect and the `www`
decision. Confirm both:

```bash
curl -sI http://<domain>/ | grep -i '^location'
curl -sI https://www.<domain>/ | grep -i '^location'
echo | openssl s_client -connect <domain>:443 2>/dev/null | openssl x509 -noout -dates
```

## Forms and conversion

Static, per `loops/05-share.md`: `mailto:`, Formspree, Tally, or a link out.

PHP `mail()` is the only native option on most cPanel accounts, and it is a poor
one. Shared IPs are widely blocklisted, so the mail is accepted by the server and
then silently dropped before it reaches an inbox. A form that returns "thanks"
and delivers nothing is worse than a `mailto:` (`loops/05-share.md`).

Use it only after the host's SMTP relay is configured with a real authenticated
sender, and only after a test send from the live domain to an external address
arrives. Otherwise take the third-party endpoint and keep the failure visible.

Whatever is chosen, submit it once from the live site and confirm the message
arrives before Gate C.

## Gotchas

- **FTP is not FTPS.** Most hosts leave plain FTP enabled and it is what a
  credential dialog defaults to. `set ftp:ssl-force true` and
  `set ssl:verify-certificate true` on every command, no exceptions.
- **Addon-domain subdirectory confusion.** An addon domain serves from
  `/public_html/<addon-domain>/`, which is also reachable as
  `<primary-domain>/<addon-domain>/`. Deploying to `/public_html` on an addon
  account overwrites the primary site. Confirm the exact document root in the
  panel before the first upload.
- **No shell.** Many plans have no SSH, so there is no `tar`, no `rsync`, no way
  to make an archive server-side. The snapshot is a full FTP download and it is
  slow. Start it early.
- **`.htaccess` gets clobbered.** The mirror excludes it above. Remove the
  exclusion and a deploy silently deletes the https redirect and every cache
  header.
- **Permissions.** Files 644, directories 755. `lftp` can upload 600 and produce
  a 403 on every request. `chmod` via File Manager or
  `lftp -c "open <host>; chmod -R 644 /public_html/assets"`.
- **Case sensitivity.** Linux hosting is case-sensitive, macOS is not.
  `Hero.jpg` referenced as `hero.jpg` works locally and 404s live.
- **Panel-installed apps.** WordPress or a site builder already in
  `public_html` will fight the upload with its own `.htaccess`. Remove it
  deliberately, with the snapshot already downloaded.
