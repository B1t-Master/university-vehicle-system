import React from 'react';
import './LoginSignup.css';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import person from '../../assets/person.png';
import password from '../../assets/password.png';
import email from '../../assets/email.png';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            </View>

            <View style={styles.logoContainer}>
                <Image source={require('../../assets/sulogo.png')} style={styles.logoImage} />
            </View>

            <Text style={styles.title}>Car Sticker</Text>
            <Text style={styles.subtitle}>Creation and Access System</Text>

            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Image source={person} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter username"
                        placeholderTextColor="#000"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

                {!isLogin && <View style={styles.inputSubContainer}>
                    <Image source={email} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        placeholderTextColor="#000"
                        value={emailAddress}
                        onChangeText={setEmailAddress}
                    />
                </View>}

                <View style={styles.inputSubContainer}>
                    <Image source={password} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter password"
                        placeholderTextColor="#000"
                        secureTextEntry={true}
                        value={passwordValue}
                        onChangeText={setPasswordValue}
                    />
                </View>
            </View>

            {isLogin && <Text style={styles.forgotPassword}>Forgot Password?</Text>}

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Don't have an account?
                    <Text style={styles.register} onPress={() => setIsLogin(!isLogin)}> Register</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00008B',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logoImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    inputIcon: {
        marginRight: 10,
        width: 20,
        height: 20,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#000',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    register: {
        color: 'blue',
    },
});

export default LoginSignup;