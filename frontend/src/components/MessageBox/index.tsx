import React from 'react'
import styles from './messagebox.module.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export enum BoxType{
    LEFT='left_arrow',
    RIGHT='right_arrow',
    NONE='none'
}

type MessageBoxProps={
    msg:string,
    type:BoxType
}

export default function MessageBox({msg, type}:MessageBoxProps) {
    return (
        <div className={cx('arrow_box', type)}>
            {msg}
        </div>
    )
}