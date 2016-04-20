
/**
 * TODO: Modularize styles and classes.
 *       This is currently a dirty and rather static fix at the moment.
 */

exports = module.exports = {

  bottomLevel: {
    background: 'none',
    width: '100px',
    height: '100px',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    margin: 0,
    fontSize: '16px',
    borderRadius: '2px',
    transition: 'all 500ms cubic-bezier(0.23, 1, 0.32, 1) 0s'
  },

  midUpperLevel: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    background: 'none',
    left: 0,
    zIndex: 1000,
    borderRadius: '2px'
  },

  midBottomLevel: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    background: 'none',
    left: 0,
    zIndex: 1000,
    borderRadius: '2px'
  },

  background: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    transition: 'all 750ms cubic-bezier(0.23, 1, 0.32, 1) 0s'
  },

  link: {
    background: 'none',
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    zIndex: 2000,
    textDecoration: 'none',
    color: 'rgba(23, 23, 23, 0.87)'
  },

  topLevel: {
    background: 'none',
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    zIndex: 2000,
    boxSizing: 'border-box',
    borderRadius: '2px'
  }

};