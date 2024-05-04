import { View, Text, Pressable, FlatList, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ categories, meals }) {

  const navigation = useNavigation();

  return (
    <View className='mx-4 space-y-3'>
      <Text style={{ fontSize: hp(3) }} className='font-semibold text-neutral-600'>Công thức nấu ăn</Text>
      <View>
        {
          categories.length == 0 || meals.length == 0 ? (
            <Loading size='large' className='mt-20' />
          ) : (
            <FlatList
              data={meals}
              keyExtractor={(item) => item.idMeal}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => <RecipeCard item={item} index={index} navigation={navigation} />}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({ first: ITEM_CNT })}
              onEndReachedThreshold={0.1}
              columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 1 }}
            // onEndReached={() => loadNext(ITEM_CNT)}
            />
          )
        }
      </View>
    </View>
  )
}

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        style={{ width: '100%' }}
        className='flex justify-center mb-4 space-y-1'
        onPress={() => navigation.navigate('RecipeDetail', { ...item })}
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35 }}
          className='bg-black/5'
        /> */}
        <CachedImage
          uri={item.strMealThumb}
          style={{ width: wp(44), height: hp(35), borderRadius: 35 }}
          className='bg-black/5'
        />
        <Text style={{ fontSize: hp(1.5) }} className='font-semibold ml-2 text-neutral-600'>
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 22) + '...' : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  )
}