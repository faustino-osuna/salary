import { forwardRef, type ReactElement } from "react";
import { Dialog, Slide, type DialogProps } from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef<HTMLDivElement, TransitionProps>(
  function Transition({ children, ...props }, ref) {
    return (
      <Slide direction="up" ref={ref} {...props}>
        {children as ReactElement}
      </Slide>
    );
  }
);

interface ModalProps extends DialogProps {}

export default function Modal(props: ModalProps) {
  return (
    <Dialog
      {...props}
      TransitionComponent={Transition}
      slotProps={{
        ...props.slotProps,
        paper: { ...props.slotProps?.paper },
      }}
    />
  );
}
