import React from 'react'
import propTypes from 'prop-types';

export const Typographies = React.memo(({ variant, className, text, role, onClick }, props) => {
    const variants = {
        'sm': 'text-sm',
        'xs': 'text-xs',
        'lg': 'text-lg',
        'xl': 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
        '7xl': 'text-7xl',
        '8xl': 'text-8xl',
        '9xl': 'text-9xl',
        'base': 'text-base'
    }

    return (<div className={`${variants[variant]} ${className}`} role={role} onClick={onClick} {...props}>
        {text}
    </div>
    )
})

Typographies.propTypes = {
    variant: propTypes.string,
    className: propTypes.string,
    text: propTypes.string,
    role: propTypes.string
}

Typographies.defaultProps = {
    variant: 'p',
    className: 'text-secondary-500 leading-0',
    text: '',
    role: 'presentation'
}