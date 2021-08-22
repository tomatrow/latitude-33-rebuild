#! /usr/local/bin/fish

set input $argv[1]
set output_name (basename $input .mp4)

ffmpeg -i $input -c:v libvpx -an -b:v 1000k -s hd720 $output_name-desktop-v8.webm
ffmpeg -i $input -c:v libvpx-vp9 -an -b:v 1000k -s hd720 $output_name-desktop-v9.webm
ffmpeg -i $input -c:v libx264 -an -b:v 1000k -s hd720 $output_name-desktop.mp4

ffmpeg -i $input -c:v libvpx -an -b:v 500k -s nhd $output_name-mobile-v8.webm
ffmpeg -i $input -c:v libvpx-vp9 -an -b:v 500k -s nhd $output_name-mobile-v9.webm
ffmpeg -i $input -c:v libx264 -an -b:v 500k -s nhd $output_name-mobile.mp4

ffmpeg -i $input -vf "select=eq(n\,0)" -q:v 3 $output_name-poster.jpg



