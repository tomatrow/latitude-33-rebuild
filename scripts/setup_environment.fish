#! /usr/local/bin/fish 

function send_npm_run -a cmd
    tmux send-keys "srcenv; and pnpm run $cmd" C-m
end

send_npm_run dev -- --open
tmux split-window -v
tmux send-keys "srcenv; and pnpm outdated" C-m