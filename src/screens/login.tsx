import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { AuthSchema } from '../validators/AuthValidators';
import { login } from '../validators/api';
import * as yup from 'yup';
import { AuthProvider, useAuth } from '../authContext/AuthContext';

function Login() {
    const { token, setAuthToken, removeAuthToken } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [errorText, setErrorText] = useState('');
    
    const handleLogin = async () => {
        setLoading(true);
        setEmailError('');
        setPasswordError('');

        try {
            await AuthSchema.validate({ email, password }, { abortEarly: false });
            setIsValidated(true);

            const token = await login(email, password);

            console.log('Token obtido:', token); // Remover

            navigation.navigate('Stops');
        } catch (error: any) {
            setIsValidated(false);

            if (error instanceof yup.ValidationError) {
                error.inner.forEach((err) => {
                    if (err.path === 'email') {
                        setEmailError(err.message);
                    } else if (err.path === 'password') {
                        setPasswordError(err.message);
                    }
                });
            } else {
                setErrorText('Email ou senha incorreto'); 
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={tw`flex-1 justify-start p-10`}>
            <View style={tw`items-center`}>
                <Image
                    style={tw`w-56 h-56`}
                    resizeMode="contain"
                    source={require('../assets/logo-datafarm.png')}
                />
            </View>
            <View style={tw``}>
                <Text style={tw`text-3xl text-black `}>Login</Text>
                <Text style={tw`py-1`}>Acesse o aplicativo</Text>
            </View>
            <View>
                <View style={tw`mt-5`}>
                    <Text style={tw`font-bold text-green-700`}>Email</Text>
                    <TextInput
                        style={tw`border-b-2 border-gray-300`}
                        placeholder='example@email.com'
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    {emailError ? <Text style={tw`text-red-500`}>{emailError}</Text> : null}
                </View>
                <View style={tw`mt-5`}>
                    <Text style={tw`font-bold text-green-700`}>Senha</Text>
                    <View style={tw`border-b-2 border-gray-300 flex-row items-center`}>
                        <TextInput
                            style={tw`flex-1`}
                            placeholder='•••••••••••••••'
                            placeholderTextColor="black"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Icon
                                name={showPassword ? 'eye' : 'eye-slash'}
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={tw`text-red-500`}>{passwordError}</Text> : null}
                </View>
                {errorText ? <Text style={tw`text-red-500`}>{errorText}</Text> : null}
                <TouchableOpacity style={tw`items-center justify-center bg-green-600 rounded mt-10`} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="white" style={tw`py-4`} />
                    ) : (
                        <Text style={tw`text-white text-xl font-bold py-3`}>ENTRAR</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;