/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Chat_group = require('../model/Chat_group');
let Chat_message = require('../model/Chat_message');
let Piece = require('../model/piece');
let Piecetemplate = require('../model/piecetemplate');
let Slot = require('../model/slot');
let Table = require('../model/table');
let Game = require('../model/game');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const gameFilter = { $or: [{ chat : { $in : chat_group } }] };
      const gameCnt = await dbService.deleteMany(Game,gameFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = {
        Chat_message :Chat_messageCnt,
        game :gameCnt,
      };
      return response; 
    } else {
      return {  chat_group : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_message = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chat_message,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePiece = async (filter) =>{
  try {
    let piece = await dbService.findMany(Piece,filter);
    if (piece && piece.length){
      piece = piece.map((obj) => obj.id);

      const pieceFilter = { $or: [{ model : { $in : piece } }] };
      const pieceCnt = await dbService.deleteMany(Piece,pieceFilter);

      const slotFilter = { $or: [{ slot : { $in : piece } }] };
      const slotCnt = await dbService.deleteMany(Slot,slotFilter);

      let deleted  = await dbService.deleteMany(Piece,filter);
      let response = {
        piece :pieceCnt + deleted,
        slot :slotCnt,
      };
      return response; 
    } else {
      return {  piece : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deletePiecetemplate = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Piecetemplate,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSlot = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Slot,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTable = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Table,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteGame = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Game,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const pieceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pieceCnt = await dbService.deleteMany(Piece,pieceFilter);

      const slotFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const slotCnt = await dbService.deleteMany(Slot,slotFilter);

      const tableFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tableCnt = await dbService.deleteMany(Table,tableFilter);

      const gameFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ jogada : { $in : user } }] };
      const gameCnt = await dbService.deleteMany(Game,gameFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        piece :pieceCnt,
        slot :slotCnt,
        table :tableCnt,
        game :gameCnt,
        user :userCnt + deleted,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const gameFilter = { $or: [{ chat : { $in : chat_group } }] };
      const gameCnt =  await dbService.count(Game,gameFilter);

      let response = {
        Chat_message : Chat_messageCnt,
        game : gameCnt,
      };
      return response; 
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_message = async (filter) =>{
  try {
    const Chat_messageCnt =  await dbService.count(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPiece = async (filter) =>{
  try {
    let piece = await dbService.findMany(Piece,filter);
    if (piece && piece.length){
      piece = piece.map((obj) => obj.id);

      const pieceFilter = { $or: [{ model : { $in : piece } }] };
      const pieceCnt =  await dbService.count(Piece,pieceFilter);

      const slotFilter = { $or: [{ slot : { $in : piece } }] };
      const slotCnt =  await dbService.count(Slot,slotFilter);

      let response = {
        piece : pieceCnt,
        slot : slotCnt,
      };
      return response; 
    } else {
      return {  piece : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countPiecetemplate = async (filter) =>{
  try {
    const piecetemplateCnt =  await dbService.count(Piecetemplate,filter);
    return { piecetemplate : piecetemplateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSlot = async (filter) =>{
  try {
    const slotCnt =  await dbService.count(Slot,filter);
    return { slot : slotCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTable = async (filter) =>{
  try {
    const tableCnt =  await dbService.count(Table,filter);
    return { table : tableCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countGame = async (filter) =>{
  try {
    const gameCnt =  await dbService.count(Game,filter);
    return { game : gameCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const pieceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pieceCnt =  await dbService.count(Piece,pieceFilter);

      const slotFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const slotCnt =  await dbService.count(Slot,slotFilter);

      const tableFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const tableCnt =  await dbService.count(Table,tableFilter);

      const gameFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ jogada : { $in : user } }] };
      const gameCnt =  await dbService.count(Game,gameFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        Chat_group : Chat_groupCnt,
        Chat_message : Chat_messageCnt,
        piece : pieceCnt,
        slot : slotCnt,
        table : tableCnt,
        game : gameCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const gameFilter = { '$or': [{ chat : { '$in' : chat_group } }] };
      const gameCnt = await dbService.updateMany(Game,gameFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = {
        Chat_message :Chat_messageCnt,
        game :gameCnt,
      };
      return response;
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_message = async (filter,updateBody) =>{  
  try {
    const Chat_messageCnt =  await dbService.updateMany(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePiece = async (filter,updateBody) =>{  
  try {
    let piece = await dbService.findMany(Piece,filter, { id:1 });
    if (piece.length){
      piece = piece.map((obj) => obj.id);

      const pieceFilter = { '$or': [{ model : { '$in' : piece } }] };
      const pieceCnt = await dbService.updateMany(Piece,pieceFilter,updateBody);

      const slotFilter = { '$or': [{ slot : { '$in' : piece } }] };
      const slotCnt = await dbService.updateMany(Slot,slotFilter,updateBody);
      let updated = await dbService.updateMany(Piece,filter,updateBody);

      let response = {
        piece :pieceCnt + updated,
        slot :slotCnt,
      };
      return response;
    } else {
      return {  piece : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePiecetemplate = async (filter,updateBody) =>{  
  try {
    const piecetemplateCnt =  await dbService.updateMany(Piecetemplate,filter);
    return { piecetemplate : piecetemplateCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSlot = async (filter,updateBody) =>{  
  try {
    const slotCnt =  await dbService.updateMany(Slot,filter);
    return { slot : slotCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTable = async (filter,updateBody) =>{  
  try {
    const tableCnt =  await dbService.updateMany(Table,filter);
    return { table : tableCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteGame = async (filter,updateBody) =>{  
  try {
    const gameCnt =  await dbService.updateMany(Game,filter);
    return { game : gameCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const pieceFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const pieceCnt = await dbService.updateMany(Piece,pieceFilter,updateBody);

      const slotFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const slotCnt = await dbService.updateMany(Slot,slotFilter,updateBody);

      const tableFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const tableCnt = await dbService.updateMany(Table,tableFilter,updateBody);

      const gameFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ jogada : { '$in' : user } }] };
      const gameCnt = await dbService.updateMany(Game,gameFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        piece :pieceCnt,
        slot :slotCnt,
        table :tableCnt,
        game :gameCnt,
        user :userCnt + updated,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteChat_group,
  deleteChat_message,
  deletePiece,
  deletePiecetemplate,
  deleteSlot,
  deleteTable,
  deleteGame,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countChat_group,
  countChat_message,
  countPiece,
  countPiecetemplate,
  countSlot,
  countTable,
  countGame,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteChat_group,
  softDeleteChat_message,
  softDeletePiece,
  softDeletePiecetemplate,
  softDeleteSlot,
  softDeleteTable,
  softDeleteGame,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
