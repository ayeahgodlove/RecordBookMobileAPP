import React, {useRef, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, IconButton, Menu} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {theme} from '../styles/theme';

interface Props {
  descHTML: string;
  setDescHTML: React.Dispatch<React.SetStateAction<string>>;
}
const RichEditor: React.FC<Props> = ({descHTML, setDescHTML}) => {
  const webViewRef = useRef<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const injectJS = (jsCode: any) => {
    webViewRef.current?.injectJavaScript(jsCode);
  };

  const handleBold = () => injectJS("document.execCommand('bold');");
  const handleItalic = () => injectJS("document.execCommand('italic');");
  const handleUnderline = () => injectJS("document.execCommand('underline');");
  const handleCenter = () => injectJS("document.execCommand('justifyCenter');");
  const handleLeft = () => injectJS("document.execCommand('justifyLeft');");
  const handleRight = () => injectJS("document.execCommand('justifyRight');");
  const handleFull = () => injectJS("document.execCommand('justifyFull');");

  const handleStrikethrough = () =>
    injectJS("document.execCommand('strikeThrough');");
  const handleFontSize = (size: any) =>
    injectJS(`document.execCommand('fontSize', false, '${size}');`);
  const handleForeColor = (color: any) =>
    injectJS(`document.execCommand('foreColor', false, '${color}');`);
  const handleOrderedList = () =>
    injectJS("document.execCommand('insertOrderedList');");
  const handleUnorderedList = () =>
    injectJS("document.execCommand('insertUnorderedList');");
  const handleUndo = () => injectJS("document.execCommand('undo');");
  const handleRedo = () => injectJS("document.execCommand('redo');");

  const handleContentChange = (event: any) => {
    const {data} = JSON.parse(event.nativeEvent.data);
    setDescHTML(data);
  };

  const menuData = [
    {
      sn: 1,
      icon: 'format-bold',
      size: 22,
      onPress: handleBold,
    },
    {
      sn: 2,
      icon: 'format-italic',
      size: 22,
      onPress: handleItalic,
    },
    {
      sn: 3,
      icon: 'format-underline',
      size: 22,
      onPress: handleUnderline,
    },
    {
      sn: 4,
      icon: 'format-strikethrough',
      size: 22,
      onPress: handleStrikethrough,
    },

    {
      sn: 5,
      icon: 'format-list-bulleted',
      size: 22,
      onPress: handleUnorderedList,
    },

    {
      sn: 6,
      icon: 'format-list-numbered',
      size: 22,
      onPress: handleOrderedList,
    },
    {
      sn: 7,
      icon: 'format-align-left',
      size: 22,
      onPress: handleLeft,
    },
    {
      sn: 8,
      icon: 'format-align-center',
      size: 22,
      onPress: handleCenter,
    },
    {
      sn: 9,
      icon: 'format-align-justify',
      size: 22,
      onPress: handleFull,
    },
    {
      sn: 10,
      icon: 'format-align-right',
      size: 22,
      onPress: handleRight,
    },
    {
      sn: 11,
      icon: 'undo',
      size: 22,
      onPress: handleUndo,
    },
    {
      sn: 12,
      icon: 'redo',
      size: 22,
      onPress: handleRedo,
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={styles.toolbar}>
          <Menu
          style={{ marginBottom: 0}}
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                icon="format-size"
                onPress={() => setMenuVisible(true)}
                compact
                mode="outlined"
                textColor={theme.colors.accent}
                >
                Font Size
              </Button>
            }>
            {[1, 2, 3, 4, 5, 6, 7].map(size => (
              <Menu.Item
                key={size}
                onPress={() => {
                  setMenuVisible(false);
                  handleFontSize(size);
                }}
                title={`Size ${size}`}
              />
            ))}
          </Menu>
          {menuData.map(m => {
            return (
              <IconButton
                key={m.sn}
                icon={m.icon}
                size={m.size}
                onPress={m.onPress}
              />
            );
          })}
        </View>
        <WebView
          ref={webViewRef}
          style={styles.editor}
          originWhitelist={['*']}
          source={{
            html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  padding: 0; 
                  margin: 0; 
                }
                .editor { 
                  outline: none; 
                  border: 1px solid #ccc; 
                  padding: 10px;
                  box-sizing: border-box;
                  height: 300px;
                  background-color: #f4f4f4;
                }
              </style>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
              <div 
                contenteditable="true" 
                class="editor" 
                oninput="window.ReactNativeWebView.postMessage(JSON.stringify({ data: this.innerHTML }));"
              >
                Start typing here...
              </div>
            </body>
            </html>
            `,
          }}
          onMessage={handleContentChange}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, maxHeight: 300},
  editor: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 15,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  //   output: {borderWidth: 1, borderColor: '#ccc', padding: 10, height: 100},
});

export default RichEditor;
