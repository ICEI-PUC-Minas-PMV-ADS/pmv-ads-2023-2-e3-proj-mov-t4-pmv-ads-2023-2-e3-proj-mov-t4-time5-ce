import { Box, Select, Text } from 'native-base';
import useProducts from '../../../hooks/use-products';
import useSales from '../../../hooks/use-sales';
import moment from 'moment';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ISaleChart, ISaleItem } from '../../../types';
import { useEffect, useState } from 'react';

export default function Report() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { products } = useProducts();

  const { sales, filter } = useSales();

  const [filtering, setFiltering] = useState(false);
  const handleFilter = async (): Promise<void> => {
    setFiltering(true);
    await filter(startDate, endDate);
    setFiltering(false);
  };

  function calcularSomaProdutosPorData(vendas: ISaleItem[]): ISaleChart[] {
    const somaProdutosPorData: { [data: string]: number } = {};

    for (const venda of vendas) {
      const dataVenda = venda.dataVenda.split('T')[0];
      let somaProdutos = 0;

      for (const produto of venda.produtos) {
        somaProdutos += produto.produtoValor;
      }

      if (somaProdutosPorData[dataVenda]) {
        somaProdutosPorData[dataVenda] += somaProdutos;
      } else {
        somaProdutosPorData[dataVenda] = somaProdutos;
      }
    }

    const resultado: ISaleChart[] = [];

    for (const dataVenda in somaProdutosPorData) {
      resultado.push({
        dataVenda: moment(dataVenda).format('DD/MM/YYYY'),
        somaProdutos: somaProdutosPorData[dataVenda],
      });
    }

    return resultado;
  }

  const [chartData, setChartData] = useState<ISaleChart[]>([]);

  const [cut, setCut] = useState(5);

  useEffect(() => {
    if (sales) {
      setChartData(calcularSomaProdutosPorData(sales));
    }
  }, [sales]);
  return (
    <Box>
      <Text fontSize='24px' fontWeight={'bold'} mb='24px'>
        Relatório de Vendas
      </Text>

      <Text mb='8px'>Período</Text>

      <Select
        selectedValue={cut.toString()}
        onValueChange={(val) => setCut(parseInt(val, 10))}
        mb='16px'
      >
        <Select.Item label='5 dias' value={'5'} />
        <Select.Item label='7 dias' value={'7'} />
        <Select.Item label='30 dias' value={'30'} />
        <Select.Item label='60 dias' value={'60'} />
      </Select>

      {/* <VStack space={2}>
        <Box>
          <Text>Data inicial</Text>
          <Input
            value={startDate}
            type='date'
            onChangeText={(val) => setStartDate(val)}
          />
        </Box>
        <Box>
          <Text>Data final</Text>
          <Input
            value={endDate}
            type='date'
            onChangeText={(val) => setEndDate(val)}
          />
        </Box>
        <Button mt='8px' isLoading={filtering} onPress={handleFilter}>
          Gerar relatório
        </Button>
      </VStack> */}

      {sales?.length && chartData && (
        <LineChart
          data={{
            labels: chartData
              .slice(-1 * cut)
              .map((data) =>
                moment(data.dataVenda, 'DD/M/YYYY').format('DD/MM')
              ),
            datasets: [
              {
                data: chartData
                  .slice(-1 * cut)
                  .map((data) => data.somaProdutos),
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} // from react-native
          height={220}
          yAxisLabel='R$'
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 0,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 0,
          }}
        />
      )}
    </Box>
  );
}
