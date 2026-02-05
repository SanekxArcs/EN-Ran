import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const styleJoiner = (...args: any[]) => twMerge(clsx(args))
