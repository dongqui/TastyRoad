import List from "./nav";
import {Input, Row} from "react-materialize";
import React, { useState } from "react";

const PostRestaurant = () => {



    return (
        <Row>
            음식점
            <input
                ref={this.modalInput}
                onChange = {this.onChange}
                placeholder = '음식점 이름을 적어주세요!'
                id = 'input'
            />
            {this.state.mapData.length ? this.state.mapData.map((data) => {
                return <List
                    place={data}
                    onClick = {this.onClickHandler}
                />
            }) : '' }
            <br /><br />

            <Input name='group1' type='radio' value='korean' label='한식' className='with-gap' />
            <Input name='group1' type='radio' value='western' label='양식' className='with-gap' />
            <Input name='group1' type='radio' value='japanese' label='일식' className='with-gap' />
            <Input name='group1' type='radio' value='chinese' label='중식' className='with-gap' />
            <Input name='group1' type='radio' value='etc' label='기타' className='with-gap' />

            <br /><br />
            <Rating
                emptySymbol = {<img src="/img/star-empty.png" className="icon" />}
                fullSymbol = {<img src="/img/star-full.png" className="icon" />}
                onChange = { rate => {
                    this.data.rating = rate
                }
                }/>
            <br /><br />
            음식의 맛을 평가해주세요!
            <textarea
                ref={this.modalTextArea}
                rows='7'
                cols='15'
                label='review'
                style={{width:'100%', height:'15%'}}
                onChange={this.handleChange}
            />
        </Row>
    )
};