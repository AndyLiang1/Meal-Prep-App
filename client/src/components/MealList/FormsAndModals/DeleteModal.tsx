import { useLazyQuery, useMutation } from '@apollo/client';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteMealListFoodDocument, DeleteMealListMealDocument } from '../../../generated/graphql-client';
import { addUserToStore, setModalStatus, triggerRefetch } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { UserInfoInterface } from '../../../state/reducers/UserData';
import styles from './DeleteModal.module.css';
export interface IDeleteModalProps {
    deleteType: string;
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    mealId?: string;
    foodName?: string;
    foodIndex?: number;
}

export function DeleteModal({ deleteType, setDeleteModal, mealId, foodName, foodIndex }: IDeleteModalProps) {
    const user: UserInfoInterface = useSelector((state: IRootState) => state.user);
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const { modalStatus } = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();

    const [deleteMeal] = useMutation(DeleteMealListMealDocument);
    // const [deleteFood] = useMutation();
    const deleteUserObject = async () => {
        switch (deleteType) {
            case 'mealListMeal':
                if (mealId) {
                    await deleteMeal({ variables: { dayIndex, mealId: mealId! } });
                }
                break;
            default:
        }
        // if (deleteType === 'mealList') {
        //     if (objectToDelete === 'meal' && mealId) {
        //         await deleteMeal({ variables: { dayIndex, mealId } });
        //     } else if (objectToDelete === 'food' && mealId) {
        //         const deleteFoodInput = {
        //             dayIndex,
        //             mealId,
        //             foodIndex
        //         };
        //         // await deleteFood({
        //         //     variables: {
        //         //         input: deleteFoodInput
        //         //     }
        //         // });
        //     }
        // } else if (fromWhere === 'foodList') {
        //     const deleteFoodInput = {
        //         foodName: foodName!
        //     };
        //     // await deleteFood({
        //     //     variables: {
        //     //         input: deleteFoodInput
        //     //     }
        //     // });
        // }
        dispatch(triggerRefetch());
        setDeleteModal(false);
    };
    return (
        <div className={styles.container}>
            {deleteType === 'mealListMeal' && <div>Are you sure you want to delete this meal?</div>}
            {deleteType === 'mealListFood' && <div>Are you sure you want to delete this food from your meal?</div>}
            {deleteType === 'foodList' && <div>Are you sure you want to delete this food? Doing so will delete this food from all meals too!</div>}
            <div className={styles.btn_container}></div>
            <button
                onClick={() => {
                    deleteUserObject();
                    dispatch(setModalStatus(false));
                }}
            >
                Yes
            </button>
            <button
                onClick={() => {
                    dispatch(setModalStatus(false));
                    setDeleteModal(false);
                }}
            >
                Cancel
            </button>
        </div>
    );
}
