import style from '@styles/spinner/style.module.scss';

type Props = {
    className?: string
}

export default function Spinner({ className }: Props) {
    return <div className={`${style.spinner} ${className || ''}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
}