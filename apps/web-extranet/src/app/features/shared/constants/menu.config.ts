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
  },
  {
    label: 'Inventario',
    icon: 'pi pi-briefcase',
    routerLink: '/inventario',
    roles: ['ADMIN_GENERAL', 'ADMIN_TIENDA']
  },
  {
    label: 'Notificacion',
    icon: 'pi pi-briefcase',
    routerLink: '/notificacion',
    roles: ['ADMIN_GENERAL', 'ADMIN_TIENDA']
  }
];

export const APP_ROLES_ITEMS = [
  {
    label: 'Administrador General',
    value: 'ADMIN_GENERAL'
  },
  {
    label: 'Administrador Tienda',
    value: 'ADMIN_TIENDA'
  },
  {
    label: 'Cajero',
    value: 'CAJERO'
  }
];


export const APP_IMPUESTO_ITEMS = [
  {
    label: 'GRAVADO 18%',
    value: 'g18'
  },
  {
    label: 'Exonerado',
    value: 'exo'
  },
  {
    label: 'Inafecto',
    value: 'ina'
  },
    {
    label: 'ICBPER',
    value: 'icb'
  },
  {
    label: 'Gravado 10%',
    value: 'g10'
  }
];

export const APP_SOCIEDAD_ITEMS = [
  {
    label: 'Ferreteria Juanito',
    value: 'S1'
  },
  {
    label: 'Ferretería Ochoa',
    value: 'S2'
  },
  {
    label: 'La Casa del Tornillo',
    value: 'S3'
  },
];

