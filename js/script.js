document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
  }
});


class Slider extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            currentIndex: 0
        };

    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentIndex: (this.state.currentIndex + 1) % this.props.images.length
            });

        }, 2500);
    }

    render() {
        const { images, radius = 180 } = this.props;
        const { currentIndex } = this.state;
        const len = images.length || 0;
        const angle = 2 * Math.PI / len;

        return /*#__PURE__*/(
            React.createElement("div", { className: "slider" }, /*#__PURE__*/
                React.createElement("div", {
                    className: "slider__viewport",
                    style: {
                        transform: `translateZ(${-radius}px) rotateY(${-currentIndex * angle}rad)`
                    }
                },

                    images.map((image, index) => {
                        const indexAngle = index * angle;
                        const z = Math.cos(indexAngle) * radius;
                        const x = Math.sin(indexAngle) * radius;

                        return /*#__PURE__*/(
                            React.createElement("div", {
                                key: image,
                                className: classNames(
                                    'slider__image',
                                    { 'slider__image_active': index === currentIndex }),

                                style: {
                                    transform: `translateZ(${z}px) translateX(${x}px) rotateY(${indexAngle}rad)`
                                }
                            }, /*#__PURE__*/

                                React.createElement("img", { src: image })));


                    }))));




    }
}


class App extends React.PureComponent {
    render() {
        return /*#__PURE__*/(
            React.createElement(Slider, {
                images: [
                    'js/20240706_221049.jpg',
                    'https://xunix.uz/assets/second.png',
                    'https://xunix.uz/assets/three.png'
                ],
                radius: 210
            }));


    }
}


ReactDOM.render( /*#__PURE__*/
    React.createElement(App, null),
    document.getElementById('slider_frame'));
