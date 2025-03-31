import { View, Text, FlatList, SafeAreaView, Image, Alert } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import Button from "@/components/Button_react_paper";
import * as ImagePicker from "expo-image-picker";
const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png"; // Replace with your actual image URL

import { useCart } from "../providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { TextInput } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "../api/product";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/superbase";
import { decode } from "base64-arraybuffer";
const CreateproductScreen = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [Error, setError] = React.useState("");
  const [image, setImage] = useState<string | null>(null);
  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );

  const updating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(id);
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const confirmdelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: onDelete },
      ]
    );

    console.log("Product deleted");
  };

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.push("/(admin)");
      },
    });
  };

  const onSubmit = () => {
    if (updating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onUpdate = async () => {
    if (!validateFields()) {
      return;
    }

    const imagePath = await uploadImage();
    console.log("Product updated", { name, price });
    updateProduct(
      { name, price: parseFloat(price), image: imagePath, id },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetFields = () => {
    setName("");
    setPrice("");
    setImage(null);
    setError("");
  };

  const validateFields = () => {
    if (!name) {
      console.log("Please fill in all fields");
      setError("Please fill in all fields");
      return false;
    }
    if (!price) {
      console.log("Please fill in all fields");
      setError("Please fill in all fields");
      return false;
    }

    if (isNaN(Number(price))) {
      console.log("Price must be a number");
      setError("Price must be a number");
      return false;
    }

    return true;
  };

  const onCreate = async () => {
    if (!validateFields()) {
      return;
    }
    const imagePath = await uploadImage();
    insertProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <ThemedText
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {updating ? "Update Product" : "Create New Product"}
        </ThemedText>

        <Image
          source={{ uri: image || defaultPizzaImage }}
          style={{
            width: 200,
            height: 200,
          }}
        />

        <ThemedText
          style={{
            fontSize: 16,
            color: "#666",
            marginBottom: 10,
            textAlign: "center",
            fontStyle: "italic",
          }}
          onPress={pickImage}
        >
          select image for the product
        </ThemedText>
        <TextInput
          label="Product Name"
          style={{
            width: "100%",
            marginBottom: 15,
          }}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          label="Product Price"
          style={{
            width: "100%",
            marginBottom: 20,
          }}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <ThemedText
          style={{
            color: Error === "Product created" ? "green" : "red",
            marginBottom: 10,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {Error}
        </ThemedText>
        <Button text={updating ? "Update" : "Create"} onPress={onSubmit} />
        {updating && <Button text="Delete" onPress={confirmdelete} />}
      </View>
    </SafeAreaView>
  );
};

export default CreateproductScreen;
