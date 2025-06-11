import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform, TextInput, Button } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://172.23.192.1:4000"
    : "http://localhost:4000";

export default function App() {
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    setLoading(true);
    fetch(`${BASE_URL}/items`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch items");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setLoading(true);
    fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add item");
        return res.json();
      })
      .then(() => {
        setNewItem("");
        fetchItems();
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 16 }}>Items</Text>
      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Add new item"
          value={newItem}
          onChangeText={setNewItem}
        />
        <Button title="Add" onPress={addItem} />
      </View>
      <Button title="Refresh" onPress={fetchItems} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={{ color: "red" }}>{error}</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
    minWidth: 150,
    backgroundColor: "#fff",
  },
});