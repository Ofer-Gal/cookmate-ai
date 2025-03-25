import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import Colors from "@/services/Colors";
import Button from "./Button";
import { AiModel, imageGenerator } from "@/services/GlobalApi";
import prompts from "@/services/Prompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LoadingDialog from "./LoadingDialog";

const CreateRecipe = () => {
    const [userInput, setUserInput] = React.useState<string>();
    const [recipeOptions, setRecipeOptions] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [openloading, setOpenLoading] = React.useState<boolean>(false);
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const onGenerate = async () => {
        if (!userInput) {
            Alert.alert("Please enter a details to generate");
            return;
        }
        setLoading(true);
        const result = await AiModel(
            userInput + prompts.GENERATE_RECIPE_OPTION_PROMPT
        );
        const content = result?.choices[0]?.message?.content;
        console.log(content);
        if (content) {
            setRecipeOptions(JSON.parse(content));
        } else {
            Alert.alert("Failed to generate recipe options");
        }
        setLoading(false);
        actionSheetRef.current?.show();
    };

    const GenerateCopmleateRecipe = async (option: any) => {
        actionSheetRef.current?.hide();
        setOpenLoading(true);
        const PROMPT =
            "RecipieName:" +
            option.recipeName +
            +" Description: " +
            option.description +
            prompts.GENERATE_COMPLETE_RECIPE_PROMPT;
        const result = await AiModel(PROMPT);
        const content:any = result?.choices[0]?.message?.content;
        const JSONContent = JSON.parse(content);
        // console.log(content);
        // console.log(JSONContent);
        await GenerateRecipeImage(JSONContent?.imagePrompt);
        setOpenLoading(false);
    };

    const GenerateRecipeImage = async (prompt: string) => {
        const result = await imageGenerator(prompt);
        console.log(result);
    };
    return (
        <View style={styles.container}>
            <Image
                source={require("@/assets/images/pan3.gif")}
                style={styles.panImage}
            />
            <Text style={styles.heading}>
                Warm up your stove, let's get cooking!
            </Text>
            <TextInput
                style={styles.textInput}
                multiline={true}
                numberOfLines={4}
                placeholder="What do you want to create? Add ingrediants"
                onChangeText={(text) => setUserInput(text)}
                value={userInput}
            />
            <Button
                label="Generate Recipe"
                iconName="sparkles"
                loading={loading}
                onPress={() => onGenerate()}
            />
            <LoadingDialog
                visible={openloading}
                text={"Generating Recipe..."}
            />

            <ActionSheet ref={actionSheetRef}>
                <View style={styles.actionSheetContainer}>
                    <Text style={styles.heading}>Select Recipes</Text>
                    <View>
                        {recipeOptions &&
                            recipeOptions.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.recepieItemContainer}
                                    onPress={() =>
                                        GenerateCopmleateRecipe(item)
                                    }
                                >
                                    <Text style={styles.recepieName}>
                                        {item?.recipeName}
                                    </Text>
                                    <Text style={styles.recepieDescription}>
                                        {item?.description}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                    </View>
                </View>
            </ActionSheet>
        </View>
    );
};
export default CreateRecipe;
const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center", //   justifyContent: 'center',              height: '100%'
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.SECONDARY,
        borderRadius: 25,
    },
    panImage: {
        width: 80,
        height: 80,
    },
    recepieName: {
        fontFamily: "outfit-bold",
        fontSize: 16,
        textAlign: "center",
    },
    recepieDescription: {
        fontFamily: "outfit",
        color: Colors.GRAY,
    },
    heading: {
        fontFamily: "outfit-bold",
        fontSize: 20,
        textAlign: "center",
    },
    textInput: {
        backgroundColor: Colors.WHITE,
        width: "100%",
        borderRadius: 15,
        height: 120,
        marginTop: 8,
        fontSize: 16,
        padding: 15,
        textAlignVertical: "top",
        textOverflow: "wrap",
    },
    actionSheetContainer: {
        flex: 1,
        padding: 25,
    },
    recepieItemContainer: {
        borderWidth: 0.2,
        borderRadius: 15,
        padding: 15,
        marginTop: 15,
    },
});
