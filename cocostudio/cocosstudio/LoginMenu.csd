<GameFile>
  <PropertyGroup Name="LoginMenu" Type="Scene" ID="a2ee0952-26b5-49ae-8bf9-4f1d6279b798" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" ctype="GameNodeObjectData">
        <Size X="1136.0000" Y="640.0000" />
        <Children>
          <AbstractNodeData Name="bg" ActionTag="1694043600" Tag="19" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="0.8121" RightMargin="-0.8120" TopMargin="0.0002" BottomMargin="-0.0002" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" ClipAble="False" BackColorAlpha="0" ColorAngle="90.0000" LeftEage="374" RightEage="374" TopEage="211" BottomEage="211" Scale9OriginX="374" Scale9OriginY="211" Scale9Width="388" Scale9Height="218" ctype="PanelObjectData">
            <Size X="1136.0000" Y="640.0000" />
            <Children>
              <AbstractNodeData Name="codeinput" ActionTag="701229345" Tag="141" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1008.7360" RightMargin="-72.7360" TopMargin="512.5600" BottomMargin="107.4400" TouchEnable="True" FontSize="12" IsCustomSize="True" LabelText="" PlaceHolderText="openid登陆" MaxLengthText="10" ctype="TextFieldObjectData">
                <Size X="200.0000" Y="20.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="1108.7360" Y="117.4400" />
                <Scale ScaleX="2.0000" ScaleY="2.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9760" Y="0.1835" />
                <PreSize X="0.1761" Y="0.0313" />
              </AbstractNodeData>
              <AbstractNodeData Name="version" ActionTag="-877301287" Tag="10" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="828.5056" RightMargin="17.4944" TopMargin="571.9887" BottomMargin="39.0113" IsCustomSize="True" FontSize="25" LabelText="当前版本:V3.0.12" HorizontalAlignmentType="HT_Right" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                <Size X="290.0000" Y="29.0000" />
                <AnchorPoint ScaleX="1.0000" ScaleY="0.5000" />
                <Position X="1118.5056" Y="53.5113" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.9846" Y="0.0836" />
                <PreSize X="0.2553" Y="0.0453" />
                <FontResource Type="Normal" Path="Font/FZY4JW_0569.TTF" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="568.8121" Y="319.9998" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5007" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="commonCells/commonPic/jxnn_bg_login@2x.png" Plist="" />
            <SingleColor A="255" R="255" G="255" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="logo" ActionTag="1441363119" Tag="30" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="545.0000" RightMargin="545.0000" TopMargin="189.6080" BottomMargin="404.3920" ctype="SpriteObjectData">
            <Size X="600.0000" Y="571.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="568.0000" Y="427.3920" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.6678" />
            <PreSize X="0.0405" Y="0.0719" />
            <FileData Type="Normal" Path="logo.png" Plist="" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="wxBtn" ActionTag="-444152455" Tag="6" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="433.0000" RightMargin="433.0000" TopMargin="427.6840" BottomMargin="113.3160" TouchEnable="True" FontSize="14" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="240" Scale9Height="77" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="270.0000" Y="99.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="568.0000" Y="162.8160" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.2544" />
            <PreSize X="0.2377" Y="0.1547" />
            <TextColor A="255" R="65" G="65" B="70" />
            <NormalFileData Type="Normal" Path="commonCells/commonPic/loginPic/jxnn_btn_weixin@2x.png" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="guestBtn" ActionTag="-876271660" Tag="164" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="397.0000" RightMargin="397.0000" TopMargin="432.3640" BottomMargin="102.6360" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="312" Scale9Height="83" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="342.0000" Y="105.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="568.0000" Y="155.1360" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.2424" />
            <PreSize X="0.3011" Y="0.1641" />
            <TextColor A="255" R="65" G="65" B="70" />
            <NormalFileData Type="Normal" Path="commonCells/commonPic/loginPic/btn_youke@2x.png" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="choose" ActionTag="162858962" VisibleForFrame="False" Tag="125" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="829.9088" RightMargin="260.0912" TopMargin="403.9440" BottomMargin="190.0560" ctype="SpriteObjectData">
            <Size X="46.0000" Y="46.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="852.9088" Y="213.0560" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.7508" Y="0.3329" />
            <PreSize X="0.0405" Y="0.0719" />
            <FileData Type="Default" Path="Default/Sprite.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="Image_87" ActionTag="-1536510835" Tag="581" IconVisible="False" PositionPercentXEnabled="True" LeftMargin="354.0000" RightMargin="356.0000" TopMargin="119.4288" BottomMargin="376.5712" LeftEage="140" RightEage="140" TopEage="47" BottomEage="47" Scale9OriginX="140" Scale9OriginY="47" Scale9Width="146" Scale9Height="50" ctype="ImageViewObjectData">
            <Size X="426.0000" Y="144.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="567.0000" Y="448.5712" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4991" Y="0.7009" />
            <PreSize X="0.3750" Y="0.2250" />
            <FileData Type="Normal" Path="commonCells/commonPic/loginPic/yypk_logoStar@2x.png" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="CheckType0" ActionTag="574067444" Tag="244" IconVisible="False" LeftMargin="315.6901" RightMargin="776.3099" TopMargin="547.3320" BottomMargin="47.6680" TouchEnable="True" CheckedState="True" ctype="CheckBoxObjectData">
            <Size X="44.0000" Y="45.0000" />
            <Children>
              <AbstractNodeData Name="agreement" ActionTag="-282035098" Tag="148" IconVisible="False" LeftMargin="57.0638" RightMargin="-296.0638" TopMargin="6.0635" BottomMargin="6.9365" TouchEnable="True" LeftEage="93" RightEage="93" TopEage="10" BottomEage="10" Scale9OriginX="93" Scale9OriginY="10" Scale9Width="97" Scale9Height="12" ctype="ImageViewObjectData">
                <Size X="283.0000" Y="32.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="198.5638" Y="22.9365" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="4.5128" Y="0.5097" />
                <PreSize X="6.4318" Y="0.7111" />
                <FileData Type="Normal" Path="commonCells/commonPic/loginPic/jxnn_img_agree.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint ScaleX="0.5000" />
            <Position X="337.6901" Y="47.6680" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.2973" Y="0.0745" />
            <PreSize X="0.0387" Y="0.0703" />
            <NormalBackFileData Type="Normal" Path="commonCells/commonPic/loginPic/jxnn_btn_disagree.png" Plist="" />
            <PressedBackFileData Type="Normal" Path="commonCells/commonPic/loginPic/jxnn_btn_disagree.png" Plist="" />
            <NodeNormalFileData Type="Normal" Path="commonCells/commonPic/loginPic/jxnn_btn_agree.png" Plist="" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>