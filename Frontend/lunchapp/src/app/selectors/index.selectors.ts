import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AppState} from '../reducers/index'
import {
  ShowUser,
  ShowCompany,
   ShowRole,
  ShowAdmin,
   UserRole,
   ShowRider,
   ShowOrder,
   ShowFood,
    ShowFeedback
   } from '../models/index';
import * as _ from 'lodash';
import { detectChange, percentChange } from '../utils/app-utils';


export const getAppState = createFeatureSelector<AppState>('lunch');

export const getUserRole =createSelector(
  getAppState,
  (state) => state.userRoles
)

export const getUsers = createSelector(
  getAppState,
  (state) => state.users
);

export const getRoles = createSelector(
  getAppState,
  (state) => state.roles
);

export const getOrders = createSelector(
  getAppState,
  (state) => state.orders
);

export const getAdmins = createSelector(
  getAppState,
  (state) => state.admins
);

export const getRiders = createSelector(
  getAppState,
  (state) => state.riders
);

export const getCompanies = createSelector(
  getAppState,
  (state) => state.companies
);

export const getFoods = createSelector(
  getAppState,
  (state) => state.foods
);

export const getFeedbacks = createSelector(
  getAppState,
  (state) => state.feedbacks
);

export const getAccounts = createSelector(
  getAppState,
  (state) => state.accounts
);

export const getError = createSelector(
  getAppState,
  (state) => state.fileUploadError
)

export const getStatus = createSelector(
  getAppState,
  (state) => state.status
)

export const getInProgress = createSelector(
  getAppState,
  (state) => state.progress
)
export const getAdminsDetails = createSelector(
  getAdmins,
  getUserRole,
  getRoles,
  (admins:ShowAdmin[], userrole:UserRole[], roles: ShowRole[]) => {
    let newList:any = []
    let newAdminList:any =[]
    let finalAdminList:any =[]
    if( admins && userrole && roles){

  newList = admins.map(a =>
   ({...userrole.find(p => a.id === p.user_id), ...a}));

   newAdminList = newList.map((a: { role_id: number; }) =>
    ({...roles.find(p => a.role_id === p.id), ...a}));

   finalAdminList= newAdminList.map((a:any) => {
    return {
      id:a.id,
      fullName:a.fullName,
      email:a.email,
      isActive:a.isActive,
      role:a.name,
      password:a.password}
  });
    }
    return finalAdminList;
  }
);

export const getFoodWithDetails = createSelector(
  getFoods,
  getAdmins,
  (foods:ShowFood[], admins:ShowAdmin[]) => {
    let foodList:any[] =[];
    if (foods && admins) {
      foodList =foods.map(a =>
        ({...admins.find(p => a.addedBy=== p.id), ...a}));

        foodList = foodList.map((a:any) => {
          return {
            id: a.id,
            name: a.name,
            imagePath: a.imagePath,
            price: a.price,
            dateAdded: a.dateAdded,
            addedBy: a.fullName,
            ingredients: a.ingredients
          }});
    }
    return foodList;
  }
);


export const getUsersDetails = createSelector(
  getUsers,
  getCompanies,
  (selectUsers:ShowUser[],selectCompany: ShowCompany[]) => {
    console.log('______', selectUsers, selectCompany)
    let newUsers:any =[];
    let newUserList:any = [];
     if (selectUsers && selectCompany){
      newUsers= selectUsers.map((a:any) =>
      ({...selectCompany.find(p => a.companyId === p.id), ...a}));
      newUserList = newUsers.map((a:any) => {
        return {id:a.id,
          fullName:a.fullName,
           email:a.email,
            isActive:a.isActive,
             companyName:a.name,
             dateCreated: a.dateCreated}
      });
     }
     return newUserList;
  }
);

export const getRidersWithDetails = createSelector(
  getAdmins,
  getRiders,
  (admins:ShowAdmin[], riders:ShowRider[]) =>{
    let newRiders:any =[];
    let newridersList:any = [];
    if (admins && admins){

      newRiders= riders.map((a:any) =>
      ({...admins.find(p => a.addedBy === p.id), ...a}));
      newridersList = newRiders.map((a:any) => {
        return {
          id:a.id,
          name:a.name,
           email:a.email,
           motorNumber:a.motorNumber,
           tellNumber: a.tellNumber,
           dateAdded: a.dateAdded,
           addedBy: a.fullName
          }
      });
    }
    return newridersList;
  }
);

export const getOrdersWithUserDetails = createSelector(
  getOrders,
  getUsersDetails,
  getRiders,
  getFoods,
  (
    orders:ShowOrder[],
    users: any[],
    riders:ShowRider[],
    foods: ShowFood[],


    ) => {
    let newOrders:any[] = [];
    let newOrdersWithDetails:any[] = [];
    let orderWithRiders: any[] = [];
    let ordersWithFoodName: any[] = [];
    let OrdersDetails: any[] = [];

    if (orders && users && riders && foods){
      newOrders= orders.map((a:any) =>
      ({...users.find(p => a.userId === p.id), ...a}));

      orderWithRiders = newOrders.map((a:any) =>
      ({...riders.find(p => a.riderId === p.id), ...a}));

      ordersWithFoodName = orders.map((a:any) =>
      ({...foods.find(p => a.foodId === p.id), ...a}));

      let newOdersFoodName = ordersWithFoodName.map((a:any) =>
      {
        return {
            orderId: a.id,
            foodName: a.name,
            imagePath: a.imagePath
        }
      }
      )

      OrdersDetails = orderWithRiders.map((a:any) =>
      ({...newOdersFoodName.find(p => a.id === p.orderId), ...a}));

      newOrdersWithDetails = OrdersDetails.map((a:any) => {
        return {
          id:a.id,
          orderDate:a.orderDate,
          foodName: a.foodName,
          imagePath: a.imagePath,
          cost:a.cost,
          totalNumber: a.totalNumber,
          destination: a.destination,
          orderby:a.fullName,
          companyName: a.companyName,
          trackingStage: a.trackingStage,
          riderName: a.name,
          }
      });
    }
    return newOrdersWithDetails;
  }
);

export const feedbackWithdetails = createSelector(
  getFeedbacks,
  getFoods,
  getUsers,
  (feedbacks:ShowFeedback[], foods:ShowFood[], users:ShowUser[]) => {
    let newFeedbacks: any[] =[];
    let feedbackwithUser: any[] =[];
    let finalFeedbackwWithDetails: any =[];
    if (feedbacks && foods && users) {
      console.log('_______U',users)
      console.log('_______U',feedbacks)

      newFeedbacks = feedbacks.map((a:any) =>
      ({...users.find(p => a.commentedBy === p.id), ...a}));
      console.log('______NN', newFeedbacks)

      feedbackwithUser =  newFeedbacks.map((a:any) =>
      ({...foods.find(p => a.foodId === p.id), ...a}));
      console.log('feed with details',feedbackwithUser)

      finalFeedbackwWithDetails = feedbackwithUser.map((a:any) => {
        return {
          id: a.id,
          commentBy: a.fullName,
          foodName: a.name,
          imagePath: a.imagePath,
          dateCommented:a.dateCommented,
          ingredients: a.ingredients,
          comment: a.comment,
          stars: a.stars,
          }
      });
    }
    return finalFeedbackwWithDetails;
  }
)

export const getDashashboardSummaryData = createSelector(
  getUsers,
  getOrders,
  getCompanies,
  (users:ShowUser[], orders:ShowOrder[], companies:ShowCompany[]) =>{
  let summay =[]
  if(users && orders && companies){

    const totalUser = users.length;
    const retriveNumber = localStorage.getItem('userTotal');
    localStorage.setItem('userTotal',String(totalUser));

    const userDetails = {
      title: 'Total Users',
      value: totalUser || 0,
      isIncrease:detectChange(Number(retriveNumber),totalUser),
      color: 'primary',
      percentValue: percentChange(Number(retriveNumber),totalUser),
      icon: 'payments',
      isCurrency: false
    }
    summay.push(userDetails);

    const totalCompaines = companies.length
    const retriveComNumber = localStorage.getItem('companyTotal');
    localStorage.setItem('companyTotal',String(totalCompaines));

    const companyDetails = {
      title: 'Total Companies',
      value: totalCompaines || 0,
      isIncrease:detectChange(Number(retriveComNumber),totalCompaines),
      color: 'accent',
      percentValue: percentChange(Number(retriveComNumber),totalCompaines),
      icon: 'payments',
      isCurrency: false
    }
    summay.push(companyDetails);


    const totalOrder = orders.length;
    const retriveOrderNumber = localStorage.getItem('orderTotal');
    localStorage.setItem('orderTotal',String(totalOrder));

    const OrderDetails = {
      title: 'Total Orders',
      value: totalOrder || 0,
      isIncrease:detectChange(Number(retriveOrderNumber),totalOrder),
      color: 'warn',
      percentValue: percentChange(Number(retriveOrderNumber),totalOrder),
      icon: 'payments',
      isCurrency: false
    }
    summay.push(OrderDetails);

    const totalOrderDelivered = (orders.filter(data => data.trackingStage === 'delivered')).length;
    const retriveOrderDevliveredNumber = localStorage.getItem('orderTotalDelivered');
    localStorage.setItem('orderTotalDelivered',String(totalOrderDelivered))

    const OrderDeliveredDetails = {
      title: 'Total Orders Delivered',
      value: totalOrderDelivered || 0,
      isIncrease:detectChange(Number(retriveOrderDevliveredNumber),totalOrderDelivered),
      color: 'primary',
      percentValue: percentChange(Number(retriveOrderDevliveredNumber),totalOrderDelivered),
      icon: 'payments',
      isCurrency: false
    }
    summay.push(OrderDeliveredDetails)
  }
  return summay;
  }
);

export const getFoodOrderList = createSelector(
  getOrdersWithUserDetails,
  (orders:any[]) => {
    const groups = orders.reduce((groups, order) => {

      const food = order.foodName;
      if (!groups[food]) {
        groups[food] = [];
      }
      groups[food].push(food);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((food) => {
      return {
        food,
        foodBooked: groups[food].length
      };
    });
    return groupArrays
  }
)

export const getHighestOrderPerday = createSelector(
  getOrdersWithUserDetails,
  (orders:any[]) => {
    const groups = orders.reduce((groups, order) => {
      const date = order.orderDate.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        order: groups[date].length
      };
    });
    const sortedGroup = groupArrays.sort((a, b) => (a.order < b.order) ? -1 : 1);
    const selectedGroup = sortedGroup.slice(0,5)
    return selectedGroup
  }
)

export const getTodaysOrder = createSelector(
  getOrdersWithUserDetails,
  (orders:any[]) => {
    console.log('order___', orders)
    let yesterday =new Date();
    yesterday.setHours(15,30)
    yesterday.setDate(yesterday.getDate() - 1)
    console.log('yesterday', yesterday)
    let today = new Date();
    today.setHours(10, 30);
    console.log('today',today)
    let newOrders = orders.filter((data) =>
      new Date(data.orderDate).getTime()  <= new Date(today).getTime() &&
      new Date(data.orderDate).getTime() >= new Date(yesterday).getTime()
    )
    return newOrders;
  }
)
