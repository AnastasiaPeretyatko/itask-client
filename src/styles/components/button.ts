import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
    paddingInlineStart: '0px',
    paddingInlineEnd: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
})

const auth = defineStyle({
	width: '100%',
	background: 'PRIMARY_BLUE',
	_hover: {
		bgGradient: 'linear(to-b, PRIMARY_BLUE, SECONDARY_BLUE)',
	},
	_disabled: {
		background: 'SECONDARY_BLUE',
		_hover: {
			background: 'SECONDARY_BLUE',
		}
	}
})

const sidebar = defineStyle({
	display: 'flex',
	width: 'full',
	gap: 2,
	padding: 3,
	color: 'gray.500',
	fontWeight: 400,
	borderRadius: 'md',
	'& span': {
		'& svg': {
			margin: 'unset'
		},
		marginInlineEnd: 'unset'
	},
	_hover: {
		bg: 'BLACK_300',
		color: 'white'
	},
	_active: {
		bg: 'BLACK_300',
		color: 'white'
	}
})

const primary = defineStyle({
  bg: 'PRIMARY_BLUE',
  _hover: {
    bg: 'SECONDARY_BLUE',
  },
})

const day = defineStyle({
	display: 'flex',
	flexDir: 'column-reverse',
  _hover: {
    bg: 'button.neuteal.bgDarker05',
    color: 'text.primary',
  },
  _active: {
    bg: 'button.neuteal.bgDarker05',
    color: 'text.primary',
  },
})

const iconButton = defineStyle({
  minW: 'unset',
  height: 'unset',
  padding: 1,
  _hover: {
    color: 'primary.purple'
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { auth, sidebar, primary, day, iconButton },
})