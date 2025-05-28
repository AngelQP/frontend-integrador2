export const APP_MENU_ITEMS = [
  {
    label: 'Productos',
    icon: 'pi pi-desktop',
    routerLink: '/productos',
    roles: ['ADMIN_GENERAL', 'ADMIN_TIENDA', 'CAJERO']
  },
  {
    label: 'Clientes',
    icon: 'pi pi-users',
    routerLink: '/clientes',
    roles: ['ADMIN_GENERAL', 'ADMIN_TIENDA']
  },
  {
    label: 'Proveedores',
    icon: 'pi pi-briefcase',
    routerLink: '/proveedores',
    roles: ['ADMIN_GENERAL', 'ADMIN_TIENDA']
  },
  {
    label: 'Usuarios',
    icon: 'pi pi-users',
    routerLink: '/usuarios',
    roles: ['ADMIN_GENERAL', 'ADMIN_TIENDA']
  }
];
