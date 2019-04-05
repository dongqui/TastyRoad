// import React, {useRef, useState} from "react";
// import './review.css'
//
// import {addReviewReqeust} from "../../helper/axiosRequest";
// import useInput from "../../hooks/useInput";
//
// const WriteReview = function(props) {
//     const [ rating, setRating ] = useState(0);
//     const reviewContent = useInput('');
//     const { user, restaurant } = props;
//     const checkEmptyData = (data) => {
//         return Object.values(data).every(item => !!item);
//     };
//
//     const addReview = async () => {
//         const data = {user: user._id, resId: restaurant._id, review: reviewContent, rating};
//         if (checkEmptyData(data)) {
//             window.Materialize.toast('등록 실패! 양식에 맞춰서 다시 써 줘', 5000);
//             return;
//         }
//         try {
//             const newReview = await addReviewReqeust(data);
//             setReviews([newReview, ...reviews]);
//         } catch(e) {
//
//         }
//     };
//
//     return (
//
//     )
// };
//
// export default Review