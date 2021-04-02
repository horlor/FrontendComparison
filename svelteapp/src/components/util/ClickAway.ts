function clickAway(node, { enabled: initialEnabled,  onClickAway }) {
    const handleOutsideClick = ({ target }) => {
      if (!node.contains(target)) {
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

    update({ enabled: initialEnabled });
    return {
      update,
      destroy() {
        window.removeEventListener( 'click', handleOutsideClick );
      }
    };
  }

export default clickAway;