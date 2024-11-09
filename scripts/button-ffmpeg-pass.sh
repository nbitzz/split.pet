#!/bin/bash
fsize() {
    # get true size, cut 2nd field
    RESULT=$(($(du -b $1 | cut -f 1) + 0))
}
for i in *.png; do
    ffmpeg -y -i $i ${i%.png}-pass.png
done
for i in *-pass.png; do
    fsize ${i%-pass.png}.png
    IFILESIZE=$RESULT
    
    fsize $i
    NFILESIZE=$RESULT
    
    echo $IFILESIZE $NFILESIZE
    
    if [[ $NFILESIZE -lt $IFILESIZE ]]; then
        echo less
        mv $i ${i%-pass.png}.png
    else
        echo more
        rm $i
    fi
done
