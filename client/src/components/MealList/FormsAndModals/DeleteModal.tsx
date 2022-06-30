// import { useLazyQuery, useMutation } from '@apollo/client';
// import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { DeleteFoodDocument, DeleteMealDocument, GetMealsDocument, MutationDeleteFoodArgs } from '../../../generated/graphql-client';
// import { addUserToStore, setModalStatus } from '../../../state/action-creators';
// import { IRootState } from '../../../state/reducers';
// import { UserInfoInterface } from '../../../state/reducers/UserData';
// import { getUserMeals } from '../../helpers/GetMealsFunction';
// import styles from './DeleteModal.module.css';
// export interface IDeleteModalProps {
//     objectToDelete: string;
//     setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
//     mealId?: string;
//     foodName?: string;
//     foodIndex?: number;
//     fromWhere?: string;
// }

// export function DeleteModal({ objectToDelete, setDeleteModal, mealId, foodName, foodIndex,fromWhere }: IDeleteModalProps) {
//     const user: UserInfoInterface = useSelector((state: IRootState) => state.user);
//     const dayIndex = useSelector((state: IRootState) => state.dayIndex);
//     const { modalStatus } = useSelector((state: IRootState) => state);
//     const dispatch = useDispatch();

//     const [deleteMeal] = useMutation(DeleteMealDocument);
//     const [getMeals] = useLazyQuery(GetMealsDocument);
//     const [deleteFood] = useMutation(DeleteFoodDocument);
//     const deleteUserObject = async () => {
//         if (fromWhere === 'mealList') {
//             if (objectToDelete === 'meal' && mealId) {
//                 const deleteMealInput = {
//                     userId: user.id,
//                     dayIndex,
//                     mealId,
//                 };
//                 await deleteMeal({
//                     variables: {
//                         input: deleteMealInput
//                     }
//                 });
//             } else if (objectToDelete === 'food' && mealId) {
//                 const deleteFoodInput = {
//                     userId: user.id,
//                     dayIndex,
//                     mealId,
//                     foodIndex
//                 };
//                 await deleteFood({
//                     variables: {
//                         input: deleteFoodInput
//                     }
//                 });
//             }
//         } else if (fromWhere === 'foodList') {
//             const deleteFoodInput = {
//                 userId: user.id,
//                 foodName: foodName!,
//             };
//             await deleteFood({
//                 variables: {
//                     input: deleteFoodInput
//                 }
//             });
//         }

//         const day = await getUserMeals(dayIndex, user, getMeals);

//         dispatch(
//             addUserToStore({
//                 username: user.username,
//                 id: user.id,
//                 day,
//                 loggedIn: true,
//                 accessToken: localStorage.getItem('accessToken')!,
//                 foodList: user.foodList
//             })
//         );
//         setDeleteModal(false);
//     };
//     return (
//         <div className={styles.container}>
//             {fromWhere === 'mealList' && objectToDelete === 'meal' && <div>Are you sure you want to delete this meal?</div>}
//             {fromWhere === 'mealList' && objectToDelete === 'food' && <div>Are you sure you want to delete this food from your meal?</div>}
//             {fromWhere === 'foodList' && <div>Are you sure you want to delete this food? Doing so will delete this food from all meals too!</div>}
//             <div className={styles.btn_container}></div>
//             <button
//                 onClick={() => {
//                     deleteUserObject();
//                     dispatch(setModalStatus(false));
//                 }}
//             >
//                 Yes
//             </button>
//             <button
//                 onClick={() => {
//                     dispatch(setModalStatus(false));
//                     setDeleteModal(false);
//                 }}
//             >
//                 Cancel
//             </button>
//         </div>
//     );
// }
export const temp = {};