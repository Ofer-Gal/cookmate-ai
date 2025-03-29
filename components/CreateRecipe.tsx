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
import Button from "./Button";
import { CreateNewRecipe, imageGenerator, picogenGenerator, UpdateUser, AiModel } from "@/services/GlobalApi";
import prompts from "@/services/Prompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LoadingDialog from "./LoadingDialog";
import { RecipeContext, UserContext } from "@/context/UserContext";
import Colors from "@/services/Colors";
import { useRouter } from "expo-router";

const CreateRecipe = () => {
    const [userInput, setUserInput] = React.useState<string>();
    const [recipeOptions, setRecipeOptions] = React.useState<any[]>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [openloading, setOpenLoading] = React.useState<boolean>(false);
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const { user, setUser } = React.useContext(UserContext);
    const { recipe, setRecipe } = React.useContext(RecipeContext);
    const router= useRouter();

    const onGenerate = async () => {
        if (!userInput) {
            Alert.alert("Please enter a details to generate");
            return;
        }
        setLoading(true);
        const content: any = await AiModel(
            userInput + prompts.GENERATE_RECIPE_OPTION_PROMPT
        );
        // const content = result?.choices[0]?.message?.content; AiModel will do it
        console.log(content);
        if (content) {
            setRecipeOptions(content); //JSON.parse(content));
            actionSheetRef.current?.show();
        } else {
            Alert.alert("Failed to generate recipe options");
        }
        setLoading(false);
    };

    const GeneratecompleteRecipe = async (option: any) => {
        actionSheetRef.current?.hide();
        setOpenLoading(true);
        const PROMPT =
            "RecipeName:" +
            option.recipeName +
            +" Description: " +
            option.description +
            prompts.GENERATE_COMPLETE_RECIPE_PROMPT;
        const result: any = await AiModel(PROMPT);
        console.log(result);
        let content: any;
        if (typeof result === "string") {
            let JSONContent = '';
            if (result.includes('json')) { JSONContent = result.replace('```json', '').replace('```', ''); }
            const content = JSON.parse(JSONContent);
        }
        else if (result.error) {
            Alert.alert("Failed to generate recipe");
            setOpenLoading(false);
            return;
        }
        else { content = result; }
        // content = prompts.Complete;
        const imageUrl = await GenerateRecipeImage(content.imagePrompt);
        const insertedRecord = await SaveToDb(content, imageUrl)
        console.log(insertedRecord);
        setRecipe(insertedRecord);
        router.push({
                pathname: '/recipe-detail',    
            })
        setOpenLoading(false);
    };

    const GenerateRecipeImage = async (prompt: string) => {
      //    const result = await imageGenerator(prompt);
        const result = await picogenGenerator(prompt);
        // const result = 'https://image.picogen.io/202503/27/5/9/5930d462a94f0caa2fce7853b85d1b12.png'
        return result;
    };

    const SaveToDb = async (content: any, imageurl: string) => {
        const { data } = await CreateNewRecipe({
            ...content,
            recipeImage: imageurl,
            userEmail: user?.email,
            categories: content.category.join(",")
        });
        console.log(user);
        const updatedUser = await UpdateUser(user?.documentId, {
            credits: user?.credits - 1,
        });
        console.log(updatedUser.data);
        setUser(updatedUser.data);
        return data;
    }

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
                placeholder="What do you want to create? Add ingredients"
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
                                    style={styles.recipeItemContainer}
                                    onPress={() =>
                                        GeneratecompleteRecipe(item)
                                    }
                                >
                                    <Text style={styles.recipeName}>
                                        {item?.recipeName}
                                    </Text>
                                    <Text style={styles.recipeDescription}>
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
    recipeName: {
        fontFamily: "outfit-bold",
        fontSize: 16,
        textAlign: "center",
    },
    recipeDescription: {
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
        padding: 25,
    },
    recipeItemContainer: {
        borderWidth: 0.2,
        borderRadius: 15,
        padding: 15,
        marginTop: 15,
    },
});
