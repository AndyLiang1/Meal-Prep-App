import { useLazyQuery, useMutation } from '@apollo/client';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteFoodListDocument, DeleteMealListFoodDocument, DeleteMealListFoodInputReal, DeleteMealListMealDocument } from '../../../generated/graphql-client';
import { addUserToStore, setModalStatus, triggerRefetch } from '../../../state/action-creators';
import { IRootState } from '../../../state/reducers';
import { UserInfoInterface } from '../../../state/reducers/UserData';
import { WarningIcon } from '../../helpers/Icons';
import styles from './DeleteModal.module.css';
export interface IDeleteModalProps {
    deleteType: string;
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    mealId?: string;
    foodName?: string;
    foodIndex?: number;
}

export function DeleteModal({ deleteType, setDeleteModal, mealId, foodName, foodIndex }: IDeleteModalProps) {
    const dayIndex = useSelector((state: IRootState) => state.dayIndex);
    const dispatch = useDispatch();

    const [deleteMealListMeal] = useMutation(DeleteMealListMealDocument);
    const [deleteFoodList] = useMutation(DeleteFoodListDocument);
    const [deleteMealListFood] = useMutation(DeleteMealListFoodDocument);
    const deleteUserObject = async () => {
        switch (deleteType) {
            case 'mealListMeal':
                if (mealId) {
                    await deleteMealListMeal({ variables: { dayIndex, mealId: mealId! } });
                }
                break;
            case 'mealListFood':
                if (typeof dayIndex === 'number' && typeof mealId === 'string' && typeof foodIndex === 'number') {
                    const deleteMealListFoodInput: DeleteMealListFoodInputReal = {
                        dayIndex,
                        mealId,
                        foodIndex
                    };
                    await deleteMealListFood({
                        variables: {
                            input: deleteMealListFoodInput
                        }
                    });
                }
                break;
            case 'foodList':
                if (foodName) {
                    await deleteFoodList({ variables: { oldFoodNameToDelete: foodName } });
                }
                break;
            default:
        }

        dispatch(triggerRefetch());
        setDeleteModal(false);
    };
    return (
        <div className={styles.container}>
            <div className={styles.icon_container}>
                <WarningIcon className={styles.warning_icon}></WarningIcon>
            </div>
            <div className={styles.warning_message_container}>
                {deleteType === 'mealListMeal' && <div className={styles.warning_message}>Are you sure you want to delete this meal?</div>}
                {deleteType === 'mealListFood' && <div className={styles.warning_message}>Are you sure you want to delete this food from your meal?</div>}
                {deleteType === 'foodList' && (
                    <div className={styles.warning_message}>Are you sure you want to delete this food? Doing so will delete this food from everywhere it is being used as an ingredient!</div>
                )}
            </div>
            <div className={styles.btn_container}>
                <button
                    className="btn btn-danger"
                    style={{
                        height: '80%',
                        width: '30%',
                        fontSize: '20px'
                    }}
                    onClick={() => {
                        dispatch(setModalStatus(false));
                        setDeleteModal(false);
                    }}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-primary"
                    style={{
                        height: '80%',
                        width: '30%',
                        fontSize: '20px'
                    }}
                    onClick={() => {
                        deleteUserObject();
                        dispatch(setModalStatus(false));
                    }}
                >
                    Yes
                </button>
            </div>
        </div>
    );
}
