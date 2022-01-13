import React, {ComponentProps} from 'react'
import {Story, Meta} from '@storybook/react'
import MessageBox, {BoxType} from '.'

export default {
    title:'messagebox',
    component:MessageBox
} as Meta

const Template: Story<ComponentProps<typeof MessageBox>> = (args)=> <MessageBox {...args} />

export const rightbox = Template.bind({});
rightbox.args = {msg:"hello", type: BoxType.RIGHT}

export const leftbox = Template.bind({});
leftbox.args = {msg:"bye", type: BoxType.LEFT}

export const nonebox = Template.bind({});
nonebox.args = {msg:"haha", type: BoxType.NONE}