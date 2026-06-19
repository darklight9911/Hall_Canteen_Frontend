import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        // "10 MINS" delivery-time pill (pass a clock icon as a child).
        time: "rounded-full bg-foreground/85 px-2 py-1 text-[10px] uppercase tracking-wide text-background",
        // Blue corner "% OFF" badge.
        discount: "rounded-md bg-info px-1.5 py-1 text-[11px] leading-none text-info-foreground",
        success: "bg-success/10 text-success",
        warning: "bg-brand/25 text-brand-foreground",
        info: "bg-info/10 text-info",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border border-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
