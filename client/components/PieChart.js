
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { BrokerContext } from '../context/broker.context';

const PieChartComponent = () => {
  const { ultimos10Registros } = useContext(BrokerContext);
  // Lógica para procesar los datos y prepararlos para la gráfica de pastel

  const data = [
    {
      name: 'Base',
      population: ultimos10Registros.filter((registro) => registro.estado === 'Base').length,
      color: '#FF5733',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    // Agregar más categorías según sea necesario
  ];

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Gráfico de Pasteles
      </Text>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default PieChartComponent;
