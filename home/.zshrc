
# Added by LM Studio CLI (lms)
export PATH="$PATH:/Users/taha/.lmstudio/bin"
# End of LM Studio CLI section


. "$HOME/.local/bin/env"

# bun completions
[ -s "/Users/taha/.bun/_bun" ] && source "/Users/taha/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# mimocode
export PATH=/Users/taha/.mimocode/bin:$PATH

# kimi-code
export PATH="/Users/taha/.kimi-code/bin:$PATH"
export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"

# Android SDK (added for atlas-fieldforce tablet app build, 2026-07-21)
export JAVA_HOME="/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"

# >>> grok installer >>>
export PATH="$HOME/.grok/bin:$PATH"
fpath=(~/.grok/completions/zsh $fpath)
autoload -Uz compinit && compinit -C
# <<< grok installer <<<
