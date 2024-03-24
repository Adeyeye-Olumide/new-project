
import { useContext } from "react"
import { ReviewsContext } from "../../contexts/reviews-context"
import ButtonComponent from "../button-component/button-component"
import { update } from "../../utils/firestore"
import './file.scss'
import { UserContext } from "../../contexts/user-context"
import { useSelector } from "react-redux"

import ReviewsFunc from "../../store/reviews-func"



function ReviewsComponent(){

    ReviewsFunc()

    const reviews = useSelector((state)=> state.reviews)
    const currentUser = useSelector((state)=> state.currentUser)
   
    let textElementContent, textElement


    console.log(reviews)

   

    function formSubmit(e){
        e.preventDefault()

        update({
            review: textElementContent,
            name: currentUser.displayName,
            date: new Date()
        }, 'reviews')

        textElement.value=''



    }

    function formHandler(e){

        if (e.target.className != 'text') return
        textElement = document.querySelector(".text")

        textElementContent = textElement.value

        

    }


    return(
        <div className="reviews-component-container component">
            <h2> Reviews From Our Esteemed Customers</h2>
            {
               reviews.length>0 && reviews?.map(({review, date, name})=> {
                // console.log(date.toDate().toDateString())
                console.log(date.toDate())
                return (
                    <div key={date} className = 'reviews-content'>
                        <h5>{name}:</h5>
                        <h6>{date.toDate().toDateString()}</h6>
                        <h3>{review}</h3>
                    </div>
                )
               })
            }


            <form action="" className="reviews-form" onChange={formHandler} onSubmit={formSubmit}>
                <textarea rows={4} cols={5} className='text' maxLength={250} placeholder='share your feelings about our services!!'></textarea>
                <ButtonComponent text='POST REVIEW' buttonType='plain'></ButtonComponent>

            </form>

        </div>
    )
}

export default ReviewsComponent