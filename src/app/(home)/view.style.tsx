import { style } from '@kaze-style/core'

export const classes = style({
  container: {
    margin: '1rem',
    display: 'flex',
    justifyContent: 'center'
  },
  base: {
    textDecorationLine: 'underline',
    ":hover": {
      color: 'blue'
    }
  }
})
