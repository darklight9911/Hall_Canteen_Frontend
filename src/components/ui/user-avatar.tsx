import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: number;
  className?: string;
}

export function UserAvatar({ name, avatar, size = 40, className }: UserAvatarProps) {
  const initials = name.charAt(0).toUpperCase();

  if (avatar) {
    return (
      <span
        className={cn("relative shrink-0 overflow-hidden rounded-full", className)}
        style={{ width: size, height: size }}
      >
        <Image
          src={avatar}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
          unoptimized={avatar.startsWith("data:")}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-success font-extrabold text-primary-foreground",
        className
      )}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
    >
      {initials}
    </span>
  );
}
