import React from 'react';
import { Helmet } from 'react-helmet';
import { Img, Text, Button, Heading } from '../../components';
import PostComponent from './PostComponent';
import SidebarItem from './SidebarItem';
import InfoComponent from './InfoComponent';

export default function PostPage() {
  const [searchBarValue43, setSearchBarValue43] = React.useState('');
  const recomendados = [
    {
      id: 1,
      isfav: true,
      image: 'images/img_recommended_1.png',
      url: 'link',
      title: 'Recommended Post 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 2,
      isfav: true,
      image: 'images/img_recommended_2.png',
      url: 'link',
      title: 'Recommended Post 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id: 3,
      isfav: true,
      image: 'images/img_recommended_3.png',
      url: 'link',
      title: 'Recommended Post 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  ];

  const post = {
    title: 'Recommended',
    perfilimage: 'images/img_recommended_3.png',
    image: 'images/img_recommended_3.png',
    subtitle: 'Recomended',
    tags: ['tags', 'tags'],
    sidebar: {
      vars: [
        { title: 'var', value: 50.0 },
        { title: 'var', value: 50.0 }
      ],
      sidebarText: [
        {
          id: 1,
          title: 'Sidebar Item 1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          id: 2,
          title: 'Sidebar Item 2',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          id: 3,
          title: 'Sidebar Item 3',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Role Player</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full bg-white-A700">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="flex flex-row md:flex-col justify-center items-center w-full gap-[62px] p-[3px] md:gap-10 bg-indigo-A100_01">
            {/* Conteúdo Principal */}
            <div className="flex flex-col items-center justify-start w-[51%] md:w-full mt-4 gap-5">
              <div className="flex flex-row justify-center w-full">
                <Img
                  src="images/img_unsplash_vxhpxyqocfq.png"
                  alt="unsplashone_one"
                  className="w-full md:h-auto sm:w-full object-cover rounded-[19px]"
                />
              </div>
              <div className="flex flex-col items-center justify-start w-full gap-[70px]">
                {/* Seção de Posts Recomendados */}
                <div className="flex flex-row w-full gap-[70px] md:gap-10">
                  {recomendados.map((post) => (
                    <PostComponent key={post.id} post={post} />
                  ))}
                </div>
                {/* Outras Seções de Informações */}
                <InfoComponent title="Informativo!" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in cillum pariatur." />
                {/* Mais componentes de informação */}
                <InfoComponent title="Informativo!" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in cillum pariatur." />
                <InfoComponent title="Informativo!" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in cillum pariatur." />
              </div>
            </div>
            {/* Barra Lateral */}
            <div className="flex flex-col items-center justify-start w-[33%] md:w-full">
              <div className="flex flex-col items-center justify-start w-full sm:w-full p-5 bg-black-900_99 rounded-[3px]">
                <Img
                  src="images/img_10_rectangle.png"
                  alt="imageone_one"
                  className="w-[390px] md:h-auto object-cover rounded-[14px]"
                />
                <div className="flex flex-row justify-between items-start w-full mt-2.5">
                  <div className="flex flex-row justify-start w-[28%]">
                    <div className="flex flex-col items-start justify-start w-[80%] gap-px py-[3px]">
                      <Text size="xl" as="p" className="tracking-[0.15px] text-white-A700">
                        {post.title}
                      </Text>
                      <Text size="md" as="p" className="tracking-[0.25px] !text-gray-700">
                        {post.subtitle}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="flex flex-row justify-start w-full py-1.5 px-2.5 rounded-[12px] bg-black-900_dd">
                      {post.tags.map((tag) => (
                        <Text key={tag} size="md" as="p" className="tracking-[0.10px] !font-urbanist !font-normal !leading-[7px] !text-gray-700">
                          {tag}
                        </Text>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-2.5">
                  {/* Itens da Barra Lateral */}
                  {post.sidebar.vars.map((item) => (
                    <SidebarItem key={item.title} item={item} />
                  ))}
                </div>
                {/* Mais itens da Barra Lateral */}
                {post.sidebar.sidebarText.map((item) => (
                  <SidebarItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
