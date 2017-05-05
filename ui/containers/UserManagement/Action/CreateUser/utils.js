/**
 * Created by vjtc0n on 5/5/17.
 */
import React from 'react'
import { Field, FieldArray } from 'redux-form'
import {
    ListItem, Text, View, Grid, Col
} from 'native-base'

import {
    // InputField,
    CheckBoxField,
    // DateField,
} from '~/ui/elements/Form'

import styles from './styles'

// if long then seperate
export const validate = (values) => {
    const errors = {}
    if(!values) return errors
    return errors
}

export const renderGroupAddress = ({ fields, check }) => {
    return (
        <View>
            <Grid>
                <Col style={{alignItems: 'center'}}>
                    <Text style={styles.leftAddressTitleText}>Danh sách địa điểm</Text>
                </Col>
                <Col style={{alignItems: 'center'}}>
                    <Text
                        style={styles.rightAddressTitleText}
                        onPress={() => {}}>Đánh dấu tất cả</Text>
                </Col>
            </Grid>
            {fields.map((address, index) =>
                {
                    return (
                        <ListItem key={index} last={index===fields.length-1} style={styles.listItem}>
                            <Text small style={styles.left}>{fields.get(index).address}</Text>
                            <View style={styles.right}>
                                <Field name={`${address}.ad`}  component={CheckBoxField}/>
                            </View>
                        </ListItem>
                    )
                }
            )}
        </View>
    )
}