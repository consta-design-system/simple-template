import {useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../../routes';

enum Menu {
    ABOUT = 'О нас',
    MORE = 'Еще'
}

type Item = {
    label: string;
    href: string;
    active?: boolean;
    onClick?: React.EventHandler<React.MouseEvent>;
};

const items: Item[] = [
    {
        label: Menu.ABOUT,
        href: Routes.ABOUT,
        active: true
    },
    {
        label: Menu.MORE,
        href: Routes.MORE
    }
];


const useMenuItems = (): Item[] => {
    const history = useHistory();
    let {pathname} = useLocation();

    return items.map((item) => {
        const {href} = item;

        if (pathname === Routes.HOME) {
            pathname = Routes.ABOUT;
        }

        return {
            ...item,
            active: pathname.includes(href),
            onClick: (event) => {
                history.push(href);

                event.preventDefault();
            }
        }
    });
};

export {useMenuItems};
