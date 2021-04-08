function clickAway(node, { enabled: initialEnabled,  onClickAway }) {
    const handleOutsideClick = ({ target }) => {
      if (!node.contains(target) && initialEnabled) {
        onClickAway();
      }
    };

    function update({enabled}) {
      if (enabled) {
        window.addEventListener('click', handleOutsideClick);
      } else {
        window.removeEventListener('click', handleOutsideClick);
      }
    }

    setTimeout(()=>update({ enabled: initialEnabled }),5)
    return {
      update,
      destroy() {
        window.removeEventListener( 'click', handleOutsideClick );
      }
    };
  }

export default clickAway;