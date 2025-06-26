import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'

interface DialogProps{
    open: boolean
    close: ()=> void
}

const TermsAndConditionsDialog: React.FC<DialogProps> = ({open, close}) => {
  return (
    <Dialog
    open={open}
    onClose={close}
    aria-label="Diálogo de términos y condiciones"
    >
        <DialogTitle
        sx={{
            fontWeight: 'bold'
        }}
        >
            Términos y condiciones
        </DialogTitle>
        <DialogContent
        sx={{
            scrollbarWidth: 'none'
        }}
        >
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis feugiat ultricies. Nullam vitae gravida nisi. Mauris at consequat augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed condimentum eget odio vel auctor. Proin sit amet tellus at nisl dignissim gravida. Vivamus elementum dolor non hendrerit pulvinar. Donec vitae metus eget ligula consequat lacinia non non dui. Curabitur pulvinar eu purus non finibus. Donec ac nisl non eros mattis suscipit id sed diam. Aenean metus lectus, gravida in ex nec, elementum egestas erat. Vivamus vel ante eget enim suscipit semper ac vel risus. Aliquam a ipsum sit amet mi tempor gravida sed vel leo.

Maecenas purus nisl, tristique vel feugiat eget, malesuada vitae ipsum. Aliquam erat volutpat. Vivamus in justo ac dui laoreet varius sit amet id dolor. Nunc aliquam purus sit amet vestibulum condimentum. Praesent a vehicula nisl, nec tincidunt urna. Quisque ac vulputate magna. Praesent laoreet, tellus et lacinia eleifend, ipsum ex rhoncus nulla, sed consequat nibh metus eget est.

Donec hendrerit pretium ultrices. Duis vel accumsan odio. Aliquam velit turpis, interdum eu condimentum a, malesuada a lacus. Duis eleifend felis et libero fringilla hendrerit. Vestibulum nunc mauris, pharetra vel purus at, venenatis posuere sem. Praesent nec ligula ornare, cursus nisi quis, bibendum lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam vitae ante nisl. Suspendisse tempor pharetra tempor. Phasellus ac arcu id ante euismod commodo. Pellentesque eget eleifend ipsum. Aenean aliquam mauris nec risus efficitur pharetra. Praesent vulputate lorem id mi dictum viverra. Nullam porttitor odio id lectus rhoncus faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Nullam quis congue mi. Maecenas non molestie ex, sit amet ultrices diam. Curabitur sed ipsum libero. Sed finibus sem ac tortor ullamcorper viverra. Morbi quis efficitur nisl, vel consectetur risus. Sed eget tincidunt felis. Phasellus blandit euismod elit, quis imperdiet neque. Morbi laoreet tempor dui vitae tempus. Nulla ultricies, justo non sagittis sodales, risus libero aliquet sapien, id malesuada ex libero ut mi. Sed orci lorem, varius mattis sagittis eu, hendrerit sed urna. Sed tempus massa accumsan ornare porta. Nulla vitae venenatis metus, eget tempus dui.

Nullam non dui scelerisque, dapibus elit sed, egestas tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam et finibus nibh, in ullamcorper tellus. Nam sit amet odio vel massa tristique mattis ac pellentesque lacus. Quisque pulvinar ut mauris et viverra. Nulla in commodo ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque aliquet semper sem, ut egestas orci scelerisque sed.
            </Typography>
        </DialogContent>

    </Dialog>
  )
}

export default TermsAndConditionsDialog