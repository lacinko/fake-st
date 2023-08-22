import { Icons } from '../../icons/icons'

export const deliveryOptions = [
  {
    id: 'DEL-1',
    label: 'FakeBox - self-service dispensing boxes',
    description: 'Tomorrow until 8:00,',
    value: 'free',
    icon: <Icons.Box />,
  },
  {
    id: 'DEL-2',
    label: 'Showroom FakeStore',
    description: 'Tomorrow until 8:00,',
    value: 'free or from 1$',
    icon: <Icons.Store />,
  },
  {
    id: 'DEL-3',
    label: 'Shops and supply points',
    description: 'Tomorrow until 8:00,',
    value: 'free or from 1$',
    icon: <Icons.Shop />,
  },
  {
    id: 'DEL-4',
    label: 'Delivery home',
    description: 'Tomorrow from 12:00,',
    value: 'free or from 5$',
    icon: <Icons.Home />,
  },
]

export const paymentOptions = [
  {
    id: 'PAY-1',
    label: 'Cash',
    value: 'free',
    icon: <Icons.Cash />,
  },
  {
    id: 'PAY-2',
    label: 'Card online',
    value: 'free',
    icon: <Icons.Card />,
  },
  {
    id: 'PAY-3',
    label: 'Google Pay',
    value: 'free',
    icon: <Icons.GooglePay />,
  },
  {
    id: 'PAY-4',
    label: 'Apple Pay',
    value: 'free',
    icon: <Icons.ApplePay />,
  },
]
