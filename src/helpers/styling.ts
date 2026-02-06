import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const styleJoiner = (...args: ClassValue[]) => twMerge(clsx(args))
