/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'QpPCXqEiR8eGjOj',
      'isDeleted':false,
      'username':'Caleb.Erdman69',
      'email':'Euna_Yundt@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'Caleb.Erdman69' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'H97DmukSybXgJTz',
      'isDeleted':false,
      'username':'Virgil.Jacobi19',
      'email':'Desiree_Strosin@yahoo.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'Virgil.Jacobi19' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Admin', 'User', 'System_User' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/chat_group/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blockstate/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blockstate/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blockstate/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/blockstate/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/blockstate/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/blockstate/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blockstate/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blockstate/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blockstate/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blockstate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/blockstate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chunk/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chunk/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/chunk/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/chunk/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chunk/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chunk/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chunk/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chunk/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cluster/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/cluster/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/cluster/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/cluster/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/cluster/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cluster/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cluster/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/cluster/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/cluster/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/cluster/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/cluster/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/cluster/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/cluster/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/item/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/item/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/item/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/item/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/item/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/item/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/item/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/item/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/item/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/item/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/item/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/item/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/item/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/item/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/material/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/material/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/material/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/material/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/material/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/material/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/material/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/material/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/material/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/material/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/model/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/model/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/model/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/model/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/model/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/model/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/model/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/model/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/model/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/model/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/model/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/model/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/model/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/model/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/model/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/model/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/model/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/model/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/model/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/model/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/model/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/planet/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/planet/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/planet/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/planet/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/planet/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/planet/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/planet/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/planet/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/planet/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/planet/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/planet/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/planet/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/planet/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/planet/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/planet/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/planet/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/planet/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/planet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/planet/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/planet/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/planet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/planet/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/planet/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/planet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/planet/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/planet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/planet/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/planet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/planet/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/planet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/planet/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/planet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/universe/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/universe/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/universe/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blockstate/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blockstate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blockstate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blockstate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chunk/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chunk/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chunk/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chunk/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chunk/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chunk/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chunk/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chunk/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chunk/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chunk/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chunk/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chunk/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chunk/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/cluster/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/cluster/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/cluster/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/cluster/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/cluster/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/cluster/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/cluster/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/cluster/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/cluster/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/cluster/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/item/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/model/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/model/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/model/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/model/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/model/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/model/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/model/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/model/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/model/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/model/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/model/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/model/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/model/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/planet/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/planet/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/planet/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/planet/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/planet/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/planet/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/planet/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/planet/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/planet/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/planet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/planet/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/planet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blockstate/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blockstate/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blockstate/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blockstate/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blockstate/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blockstate/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chunk/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chunk/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chunk/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chunk/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chunk/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chunk/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chunk/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cluster/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cluster/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/cluster/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/cluster/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/cluster/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/cluster/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/cluster/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cluster/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/cluster/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/cluster/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/model/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/model/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/model/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/model/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/model/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/model/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/model/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/planet/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/planet/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/planet/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/planet/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/planet/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/planet/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/planet/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/planet/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/planet/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/planet/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/planet/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/planet/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Admin', 'User', 'System_User' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Caleb.Erdman69',
      'password':'QpPCXqEiR8eGjOj'
    },{
      'username':'Virgil.Jacobi19',
      'password':'H97DmukSybXgJTz'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;