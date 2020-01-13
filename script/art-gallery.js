class ArtGallery {


    constructor(settings) {
        this.mainView = document.querySelector('.art-gallery .art-gallery_main_view');
        this.galNavList = document.querySelector('.art-gallery .nav-list');
        this.viewItems = this.mainView.querySelectorAll('.view_item');
        this.navItems = this.galNavList.querySelectorAll('.nav-list-link');
        this.main_item = this.mainView.querySelector('.main_item');
        this.bg_settings = settings.bg_settings;
        this.initial_params = {};
        this.original_btn = this.mainView.querySelector('.show_original');


    }

    events() {
        this.galNavList.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.closest('a').classList.contains('swap_item')){
                let event_target = e.target.closest('a').dataset['target'];
                this.changeBG(event_target);
                let bg_coord = this.getBGCoordinates(event_target);
                this.scaleMain(bg_coord);

            }

            this.getMainParams()
        })
        this.original_btn.addEventListener('click', e => {
            e.preventDefault();
            this.showOriginal()
        })
    }

    init() {
        console.log('Gallery has been initialized');
        this.initia_params = this.getMainParams();
        this.showOriginal()
        this.events()
    }

    changeBG(target) {
        this.viewItems.forEach(item => {
            item.classList.add('hidden')
        });
        this.mainView.querySelector(`.view_item[data-id="${target}"]`).classList.remove('hidden')
        this.mainView.dataset.status='room';

    }

    scaleMain(coordinates) {
        let params = this.getMainParams();

        this.main_item.style.position = 'absolute';
        this.main_item.style.top = coordinates.coordinates.top + 'px';
        this.main_item.style.left = coordinates.coordinates.left + 'px';
        if(params.width > params.height) {
            this.main_item.style.maxWidth = coordinates.max_width + 'px';
        } else if (params.width < params.height) {
            this.main_item.style.maxHeight = coordinates.max_height + 'px';
            this.main_item.style.height = '100%';
            this.main_item.style.maxWidth = 'none';

        }

    }

    getMainParams() {
        let width = this.main_item.offsetWidth;
        let height = this.main_item.offsetHeight;

        // console.log(`Width: ${width}; Height: ${height}`)

        return {width,height}
    }

    getBGCoordinates(target) {
        let relative_coordinates = this.bg_settings[target],
            bg = this.mainView.querySelector(`.view_item[data-id="${target}"]`),
            bg_width = bg.offsetWidth,
            bg_height = bg.offsetHeight,
            real_coordinates = {
                coordinates: {
                    top: (relative_coordinates.coordinates.top * bg_height).toFixed(),
                    bottom: (relative_coordinates.coordinates.bottom * bg_height).toFixed(),
                    left: (relative_coordinates.coordinates.left * bg_width).toFixed(),
                    right: (relative_coordinates.coordinates.right * bg_width).toFixed()
                }
            };

        real_coordinates.max_width = real_coordinates.coordinates.right - real_coordinates.coordinates.left;
        real_coordinates.max_height = real_coordinates.coordinates.bottom - real_coordinates.coordinates.top;


        return real_coordinates
    }

    showOriginal() {
        console.log(this.initia_params)

        // this.main_item.removeAttribute('style');
        this.main_item.style.position = "relative";
        this.main_item.style.maxWidth = this.initia_params.width + "px";
        this.main_item.style.maxHeight = this.initia_params.height + "px";
        this.main_item.style.height = this.initia_params.height + "px";
        this.main_item.style.top = "0px";
        this.main_item.style.left = "0px";
        this.mainView.dataset.status='original';

        // this.main_item.style.position = "relative";


        this.viewItems.forEach(item => {
            item.classList.add('hidden')
        });
    }

}



const BG_settings = {
    first: {
        coordinates: {
            top: 0.207,
            left: 0.24,
            right: 0.46,
            bottom: 0.475
        }
    },
    second: {
        coordinates: {
            top: 0.307,
            left: 0.364,
            right: 0.483,
            bottom: 0.447
        }
    },
    third: {
        coordinates: {
            top: 0.279,
            left: 0.54,
            right: 0.705,
            bottom: 0.447
        }
    }
}

let gal = new ArtGallery({
    bg_settings: BG_settings
});
gal.init();



