import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ReactComponent as Dashboard } from '../assets/icons/layout-outline.svg';
import { ReactComponent as Content } from '../assets/icons/archive-outline.svg';
import { ReactComponent as QuestionMark } from '../assets/icons/question-mark.svg';

interface NavBarElements {
    icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
    name: string;
    label: string;
    route: string;
}

export const navBarElements: NavBarElements[] = [
    {
        icon: Dashboard,
        name: 'dashboard',
        label: 'Dashboard',
        route: '',
    },
    {
        icon: Content,
        name: 'content',
        label: 'Content',
        route: '',
    },
    {
        icon: QuestionMark,
        name: 'questionsandanswers',
        label: 'Q & A',
        route: '',
    }
];
