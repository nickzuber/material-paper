
/**
 * TODO: Modularize styles and classes.
 *       This is currently a dirty and rather static fix at the moment.
 */

exports = module.exports = {

  bottomLevel: {
    background: '#fff',
    width: '50%',
    minHeight: '500px',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    margin: 0,
    fontSize: '16px',
    borderRadius: '2px',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)'
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
    backgroundColor: '#151515',
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
    padding: '5% 10%',
    boxSizing: 'border-box',
    borderRadius: '2px'
  }

};