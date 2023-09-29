import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { machines } from '../validators/api';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import tw from 'twrnc';

const StopRecord = () => {
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string; } | null>(null);
  const [machineryData, setMachineryData] = useState<{ label: string; value: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    console.log('Token:', token);  // Remover
    if (token) {
      setIsLoading(true);
      machines('', '')
        .then((json) => {

          console.log('Dados da API:', json); // Remover

          const machineryItems = json.machineries.map((machine: any) => ({
            label: machine.name,
            value: machine.id.toString(),
          }));
          setMachineryData(machineryItems);
          console.log('machineryData após atualização:', machineryItems); // Remover
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [token]);

  const handleSelectItem = () => {
    if (machineryData.length > 0) {
      console.log('Máquinas da API:', machineryData);
    } else {
      console.log('Nenhuma máquina disponível');
    }
  };

  return (
    <View style={tw`flex items-center justify-center`}>
      <TouchableOpacity onPress={handleSelectItem}>
        <Text style={tw`text-black text-lg font-bold`}>Selecione uma máquina</Text>
      </TouchableOpacity>
      {machineryData.length > 0 ? (
        <View>
          <Text style={tw`text-black font-bold`}>Máquina selecionada:</Text>
          <Dropdown
            data={machineryData}
            labelField="label"
            valueField="value"
            value={selectedItem}
            onChange={handleSelectItem}
            containerStyle={{ marginTop: 10 }}
            itemTextStyle={{ color: 'black' }}
          />
        </View>
      ) : (
        <Text style={tw`text-black`}>Carregando...</Text>
      )}
    </View>
  );
};

export default StopRecord;