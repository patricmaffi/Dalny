import React, { useState } from "react";
import { Picker, Icon, View } from "native-base";
import commonStyles from "../commonStyles";
import { getEstabs } from "../controllers/Businessctrl";

export function onFilter({ filter }) {
    // console.log('onFilter')
    return { header: null };
}

const PickerEstab = ({ value, onChange }) => {
    const [entities, setEntities] = useState(undefined);
    const [data, setData] = useState({});
    console.log("picker");
    console.log(value);
    if (value) {
        data.idpicker = value;
    }
    let updateData = () => {
        setData(Object.assign({}, data));
    };
    let loadEntities = async () => {
        if (data.entities) {
            return;
        }
        data.entities = await getEstabs();
        let arrJsxEntities = [];
        let jEntities = {};
        if (data.entities) {
            arrJsxEntities.push(
                <Picker.Item
                    key="0"
                    label="Selecione Estabelecimento"
                    value="0"
                />
            );
            data.entities.forEach((element) => {
                jEntities[element["estab"]] = element;
                arrJsxEntities.push(
                    <Picker.Item
                        key={element["estab"]}
                        label={element["descricao"]}
                        value={element["estab"]}
                    />
                );
            });
        }
        setEntities(arrJsxEntities);
        data.entities = jEntities;
        data.entity = undefined;
        updateData();
    };
    loadEntities();
    return (
        <View
            style={{
                borderColor: commonStyles.colors.mainText,
                height: 40,
                marginBottom: 10,
                flex: 9,
            }}
        >
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{
                    fontFamily: commonStyles.fontFamily,
                    color: commonStyles.colors.fontColor,
                    fontSize: 8,
                }}
                placeholderIconColor="orange"
                selectedValue={data.idpicker}
                onValueChange={(value) => {
                    if (value == "0") {
                        data.idpicker = "0";
                        data.entity = undefined;
                        updateData();
                        return;
                    }
                    data.entity = data.entities[value];
                    onChange(data.entity);
                    updateData();
                }}
            >
                {entities}
            </Picker>
        </View>
    );
};

export default PickerEstab;
