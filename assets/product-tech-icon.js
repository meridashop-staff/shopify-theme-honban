document.addEventListener('DOMContentLoaded', function() {
const techContent = {
    'tech_ico2_up.gif': {
    title: 'AWS – ANTI WRINKLE SYSTEM',
    description: 'カーボンフレームの製造工程で、チューブ内に挿入するバルーンの素材にポリエチレンではなく、より内圧のかけられるシリコンを採用する事で、そのバルーンを引き抜いた際に出来るチ ューブ内のシワを無くし応力の集中を防ぎ、美しい内部処理と、剛性、そして耐久性や信頼性も向上。'
  },
	'tech_ico3_up.gif': {
    title: 'DOUBLE CHAMBER TECHNOLOGY',
    description: 'フロントフォークブレード及び、ダウンチューブ内に、縦・横それぞれに適正なレイアウトでリブを設けたMERIDA独自のテクノロジーによって、不可能に思える２つの異なる性能を両立させる事に成功した。2つの独立したチャンバーを持たせる事で、曲げや捻れ剛性を大幅に向上。同時に、違う方向へのフレキシビリティも確保しつつチューブの軽量化も実現した。'
  },
	'tech_ico4_up.gif': {
    title: 'NANO MATRIX CARBON',
    description: 'カーボンフレームの品質を向上するために、-MERIDA はカーボンチューブの成型時に使用するエポキシにナノテクノロジー素材を配合し、チューブの構造としての強度を高め、その結果として走行中の石などのヒットに対して従来比で40%強いカーボンチューブを実現。'
  },
	'tech_ico5_up.gif': {
    title: 'FLEX STAY',
    description: 'ロードバイクとMTB ハードテールは、リヤサスペンションシステムをもたない。軽量化だけでなく、パワー伝達性能に優れるが、リジッド構造ゆえにあらゆる衝撃が直接ライダーに伝わり、ライダーを疲労させる原因となる。シートステー、チェーンステーの形状を扁平化する事で、路面からの衝撃を吸収して快適性を向上する。'
  },
	'tech_ico5_2_up.gif': {
    title: 'F-FLEX',
    description: 'フォークを意味する「F」。「F-FLEX」が採用されたエンデュランスロードバイクRIDEは、快適性と走行性能を両立したMERIDAのエアロレーサーREACTOと同様に、全てを併せ持っている。「S-FLEX」シートポストが可能にしたREACTO の衝撃吸収性能と同じ様に、「F-FLEX」はフォークから伝わる路面からの衝撃を吸収し、ハンドリングを快適にする。それは同時にライダーに安全性を提供するものでもある。'
  },
	'tech_ico5_3_up.gif': {
    title: 'S-FLEX',
    description: 'エアロロードバイクは乗り心地が悪くて、諦めが必要な乗り物という既成概念はMERIDAには通用しない。「S-FLEX」テクノロジーによってREACTOのシート周りの快適性は非常に高い評価を得ている。シートポストに内蔵されたエラストマーによって、空力性能に優れながら路面からの衝撃を劇的に軽減する。「S-FLEX」によってライダーへの疲労の蓄積を大幅に軽減した。'
  },
	'tech_ico6_up.gif': {
    title: 'CARBON FORK',
    description: 'カーボンファイバー製フロントフォーク。上位モデルにはステアリングコラムまでカーボンで作られたフルカーボンフォークを採用。あらゆる条件で確実なハンドリングとブレーキングを実現し快適性も向上させた。'
  },
	'tech_ico7_up.gif': {
    title: 'TECHNO FORMING SYSTEM(TFS)',
    description: 'テクノフォーミング（TFS）は、機械圧縮によるチューブの成型方法。ネガティブモールドに金属製のインターナルコアを用いてチューブを機械圧縮して成型する。'
  },
	'tech_ico8_up.gif': {
    title: 'HYDRO FORMING SYSTEM(HFS)',
    description: '油圧成型によってチューブを成型するハイドロフォーミング製法を採用したフレーム。PRO-LITE 66トリプルバテッドアルミニウムと組み合わせる事で、さらなる軽量化を実現した。'
  },
	'tech_ico9_up.gif': {
    title: 'PROLITE 66 TRIPLE BUTTED ALUMINIUM',
    description: 'MERIDA のアルミニウムラインナップの中で最高級の6066 高張力アルミニウムを採用したフレーム。チューブに３段階の厚みを持たせたトリプルバテッドを採用し、STW（重量比剛性）に優れた素材へ進化させた。'
  },
	'tech_ico10_up.gif': {
    title: 'RACELITE 61 ALUMINIUM',
    description: 'MERIDA特有のヒートトリートメントを施したダブルバテッドアルミニウム合金6061 アルミは独自の加工技術と組み合わせる事で高いパフ ォーマンスを実現した。'
  },
	'tech_ico11_up.gif': {
    title: 'SUPERLITE 16 ALUMINIUM',
    description: '最新の6016アルミニウムは超薄型チューブながら驚異的な強度を実現。オフロードレースやオフロードライディングフレーム向けの素材'
  },
	'tech_ico12_up.gif': {
    title: 'SHOTGUN 6061',
    description: 'ダウンチューブの下側にツインカーブを持たせたMERIDA独自のチューブ形状。曲げと捻れ剛性を大幅に向上させた。'
  },
	'tech_ico15_up.gif': {
    title: 'X-TAPER HEADTUBE',
    description: '外部バテッドしたヘッドチューブ形状と下側1.5インチの大径ベアリングを持つテーパーヘッドセットを採用。ヘッド周りの剛性だけでなくフォークまで高剛性化する事が可能で、ハンドリングの正確さを向上させた。'
  },
	'tech_ico16_up.gif': {
    title: 'SMOOTH WELDING',
    description: 'スムースな溶接跡を実現する溶接技術。美しい外観と、溶接強度の両立を実現。機能だけでなく見た目の美しさにもこだわるMERIDAならではの作り込み技術である。'
  },
	'tech_ico17_up.gif': {
    title: 'K-MOUNT',
    description: 'オプションのキックスタンドを美しく装着可能。'
  },
	'tech_ico17_2_up.gif': {
    title: 'REMOVABLE MOUNT',
    description: 'リアステーの取り外し可能なフェンダーマウントは装着時の確実な固定を実現。取り外すとシクロクロスでの泥詰まり性能に優れる。'
  },
	'tech_ico18_up.gif': {
    title: 'INTERNAL CABLE ROUTING',
    description: 'ケーブルや油圧ホースをフレームチューブに内蔵化するのは単に美しいルックスを求めるライダーから0.01秒を競うレーサーの為にあらゆる工夫を凝らし、次世代へと進化を遂げた。'
  },
	'tech_ico19_up.gif': {
    title: 'LOCKOUT / REMOTE LOCKOUT',
    description: 'MERIDAのバイクに装着されるサスペンションフォークやリヤユニットの多くは、ハンドルバーに装着された"リモートコントロール"もしくは、ユニットのレバーでロックアウトが可能。ロックアウトは急な登坂だけでなく、スムースな路面やパワフルなスプリントなどで有効な機能。'
  },
	'tech_ico20_up.gif': {
    title: 'LOCKOUT / REMOTE LOCKOUT',
    description: 'MERIDAのバイクに装着されるサスペンションフォークやリヤユニットの多くは、ハンドルバーに装着された"リモートコントロール"もしくは、ユニットのレバーでロックアウトが可能。ロックアウトは急な登坂だけでなく、スムースな路面やパワフルなスプリントなどで有効な機能。'
  },
	'tech_ico21_up.gif': {
    title: 'THROUGH AXLE',
    description: 'フロントとリヤのアクスルをスルーアクスル化する事には幾つかのメリットがある。ねじれ剛性の向上。確実で簡単なホイールの着脱。常に同じ位置にホイールをマウント出来る事による正確なブレーキローターのセッティング。MERIDAは、フロントは15mmスルーアクスル、リヤは12mmスルーアクスルこそが理想的なシステムと考える。'
  },
	'tech_ico22_up.gif': {
    title: 'POST MOUNT DISC',
    description: '現代的なディスクブレーキキャリパーの装着方法。リヤドロップアウト上部にキャリパーを装着するので、クリアランス調整や脱着が簡単。アダプターを装着する事で様々な大きさのローターを装着出来る使いやすい規格。'
  },
	'tech_ico22_2_up.gif': {
    title: 'CHAINSTAY POST MOUNT DISC',
    description: 'チェーンステーにディスクキャリパーをマウントする事によって主に３つのメリットがある。リヤトライアングルの中にセットされたブレーキシステムは、走行中にヒットする可能性が少ない。チェーンステーに支持されたディスクキャリパーは、ブレーキングフォースを効果的にフレームに分散する事が出来る。そして最後に油圧ホースのルーティングをシンプルにする事でトラブルを防止。'
  },
	'tech_ico23_up.gif': {
    title: 'M.O.R.E SUSPENSION',
    description: '「Merida Optimized Ride Engineering」の略。リヤサスペンションを装備したバイクはフレームサイズによってそのパフォーマンスが変わってしまう恐れがあるが、M.O.R.E.SUSPENSIONはバイクの性格に合わせた理想的なリヤサスペンションの作動をすべてのフレームサイズで可能にするサスペンションシステム。'
  },
	'tech_ico27_up.gif': {
    title: 'Fork Travel Hardtail',
    description: 'サスペンションフォークの最大のトラベル量を示す。'
  },
	'tech_ico28_up.gif': {
    title: 'Front／Rear Travel Suspension',
    description: 'フォークとリアサスペンションの最大トラベル量を示す。'
  },
	'tech_ico29_up.gif': {
    title: 'MODULAR HEAD',
    description: 'MERIDA独自の技術である「MODULAR HEAD システム」によって、WARP TRIの実質的なヘッドチューブ長はステムを変える事なく、+30mmまたは+60mm延長することができる。'
  },
	'tech_ico30_up.gif': {
    title: 'VPK - VIRTUAL PIVOT KINEMATICS',
    description: '140、160mmトラベルのフルサスペンションバイクで、その性能を決定するMERIDA独自のバーチャルピボットシステム。「VPK」はサスペンションのフリクションのない、反応性に優れた動きと、スイングアームの動きがチェーンに干渉しない事による変速性能、そしてブレーキング性能の向上が主なメリット。ONE-FORTYとONE-SIXTYに採用した。'
  },
	'tech_ico31_up.gif': {
    title: 'FLIP FLOP HEAD',
    description: 'たとえどんなに優れた風洞実験値を持つバイクでも、ライダーが適切なポジションを取る事が出来なければ空力面でもライダーが抵抗となってしまう。「FLIP-FLOP HEAD」は、サドルの角度を自由に変更する事が出来るので完璧なポジションを得る事を可能にした。'
  },
	'.tooltip32_up.gif': {
    title: 'NACA FASTBACK PROFILE',
    description: 'MERIDA の特別な「NACA FASTBACK」チューブ形状は、風洞実験での数値に基づいて最適化されたプロファイル。ダウンチューブ、シートチューブ、シートステーの後端部がカットされた断面を持つ特徴的な形状は空力性能と剛性を両立。'
  },
	'tech_ico33_up.gif': {
    title: 'INTERNAL CLAMP',
    description: 'プロツアーレースを戦うための機材を作る事は、最後の0.01 秒にまでこだわったバイクを作る事。この特別な内装クランプはトップチュ ーブエンドの乱気流発生を抑え、ライダーの出力を温存させる。'
  },
	'tech_ico34_up.gif': {
    title: 'FLOAT LINK REAR SUSPENSION',
    description: 'サスペンションユニットをフローティングさせるリンク構造。下側のユニット取付け部分は、ユニットの沈み込みに応じて動くシステムで反応性に優れる。プログレッシブなレバー比で、実際のトラベル量よりも長いトラベルを持っているような走破性を実現。クリーンなルックスも両立した。'
  },
	'tech_ico35_up.gif': {
    title: 'DOUBLE STOP / DOWN TUBE-EXIT',
    description: 'ゴーストシフトやケーブルの抵抗、取り回しの問題など、リヤサスペンションはその作動領域の大きさからケーブルにとって大きな問題となる。スリーブ付きのケーブルストッパー「DOUBLE STOP」と、内装式ケーブルのアッセンブルを容易にするダウンチューブ下の開口部「DOWN TUBE-EXIT」により、この問題を解決した'
  },
	'tech_ico36_up.gif': {
    title: 'DOWN TUBE-EXIT',
    description: 'ダウンチューブ下側に設けられたケーブルアウトレットにより、インターナルケーブルルーテ ィングながらメンテナンス性能を大幅に向上。ケーブルのトラブルを回避しながら、ケーブル交換時にはメカニックを煩わせることのないシステム。'
  },
	'tech_ico38_up.gif': {
    title: 'Di2 READY',
    description: '「Di2 READY」の表示があるバイクはShimano Di2 を装着する事に対応したフレーム。バッテリーはシートポストの中に装着可能。'
  },
	'tech_ico39_up.gif': {
    title: 'INTERNAL BLOCK',
    description: '2015モデルのNINETY-SIXで初めて採用されたインターナルブロックが進化。落車や過激なステアリングアングルにより、ハンドルやフォーククラウンとフレームが接触する事を防ぐ技術。追加のラバーバンパーを装備し、フォーククラウンの接触による破損を予防。'
  },
	'tech_ico40_up.gif': {
    title: 'SMART ENTRY',
    description: '完璧なインターナルルーティング。SMART EN-TRY では、ケーブルにテンションを持たせるようにクランプすることで、悪路を走ると内部でケーブルがチューブに当たって音が出る問題を解決しました。ケーブルのインレットは交換可能で、Di2、油圧ホースなど様々なケーブルに対応する事が可能。'
  },
	'tech_ico41_up.gif': {
    title: 'RACE LINK',
    description: 'フロントシングルのドライブトレインに最適化したXC&トレイル用リアサスペンションシステム。リンク式のシングルピボット設計には超軽量な80gのカーボン製ロッカーリンクを採用。25%のサグを取るとドライブトレインへの影響を限りなく少なく出来る設計で、初期の作動感はスムース、ストロークの後半になると硬くなるプログレッシブなデザインとなっている。'
  },
	'tech_ico42_up.gif': {
    title: 'DISC COOLER',
    description: 'ロードバイクのディスクブレーキはMTBと比べて、より高速で長い時間を下りながら一般的に小さなローターを装着している。放熱フィンでキャリパーの熱を放出するDISC COOLERは長い下りで安定した制動力を発揮する。'
  },
	'tech_ico43_up.gif': {
    title: 'THROUGH AXLE',
    description: 'フロントとリヤのアクスルをスルーアクスル化する事には幾つかのメリットがある。ねじれ剛性の向上。確実で簡単なホイールの着脱。常に同じ位置にホイールをマウント出来る事による正確なブレーキローターのセッティング。MERIDAは、フロントは15mmスルーアクスル、リヤは12mmスルーアクスルこそが理想的なシステムと考える。'
  },
	'tech_ico45_up.gif': {
    title: 'F-MOUNT',
    description: 'フェンダーを美しく、簡単に装着する事に対応したフレーム。'
  },
	'tech_ico46_up.gif': {
    title: 'CASTING MOTOR BRACKET',
    description: 'アルミニウム鋳造だけが出来る洗練されたシ ェイプにより、E-BIKE ドライブユニットと、フレームの強力な接続を可能にし、パフォーマンスと信頼性を向上します。'
  },
	'tech_ico47_up.gif': {
    title: 'WIRE PORT',
    description: 'MERIDA独自の設計のヘッドセットを通じてケーブル内装ルーティングを実現。クリーンで洗練された見た目を、フレーム構造への影響なしに達成。モデルによりハンドルバーとステムを含む完全インテグレーテッドルーティングを実現しているものと、ステム下から内装されるセミインテグレーテッドルーティングがある。'
  },
	'tech_ico48_up.gif': {
    title: 'C-MOUNT',
    description: 'C-Mountが用意されているバイクはリアキャリアの装着が容易かつ確実。（モデルにより専用のラックのみに対応しています。）'
  },
	'tech_ico49_up.gif': {
    title: 'THERMO GATE',
    description: 'ヘッドチューブ付近に開口部を設置しインチューブバッテリーの放熱を助けることでどんな条件でもバッテリー性能を最大限に引き出す。'
  },
	'tech_ico50_up.gif': {
    title: 'ENERGY GUARD ',
    description: 'インチューブバッテリーを保護する２つの素材によるバッテリーカバー。ソフトなアウターレイヤーはノイズを減らし、障害物からバッテリ ーを保護。ハード素材のインナーレイヤーは衝突時にバッテリーの変形を防ぐ構造。ラバーストラップやOリングは交換可能な構造。'
  },
	'tech_ico51_up.gif': {
    title: 'ENERGY GUARD TWIST',
    description: 'Energy Guartバッテリーカバーの上部に装備されるツイストロックシステム。インチューブバ ッテリーカバーの脱着を簡単にロック解除して行うことが出来る。'
  },
	'tech_ico52_up.gif': {
    title: 'ENERGY CRADLE',
    description: 'ユニークなクレードル形状がバッテリーをホールド。高剛性と低いステップスルーを両立した独自の形状。アルミニウムのカバーがインテグレートされた見た目とバッテリーの取り外し易さを実現。'
  },
	'tech_ico53_up.gif': {
    title: 'NON-SLIP TIGHTENING',
    description: '重要なボルトはT30トルクスで片側から固定されるので締め忘れやトラブルを防ぎ、メンテナンス性を大幅に向上。'
  },
	'tech_ico54_up.gif': {
    title: 'P-FLEX',
    description: '特別な形状のチューブと素材自体のフレキシビリティにより、シートステーとチェーンステーの接合部付近に柔軟性を持たせ、ピボットレスのフルサスペンションを実現。これにより、軽量化のみならずリアエンド剛性の向上にも寄与。'
  }
};

document.querySelectorAll('.product-tech-icons li').forEach(item => {
  item.addEventListener('click', function() {
    // 他の<li>から'tip-open'クラスを削除
    this.parentNode.querySelectorAll('li').forEach(sibling => {
      if (sibling !== this) {
        sibling.classList.remove('tip-open');
      }
    });

    // クリックされた<li>に'tip-open'クラスをトグル
    this.classList.toggle('tip-open');

    // <span>（tips）の位置を計算
    const ul = document.querySelector('.product-tech-icons');
    const infoTop = ul.getBoundingClientRect().top;
    const figTop = this.getBoundingClientRect().top - infoTop + this.offsetHeight;
    const tips = this.querySelector('.tips');
    tips.style.top = `${figTop}px`;

    // 画像のファイル名から<span>の内容を更新
    const imgSrc = this.querySelector('img').getAttribute('src');
    const fileName = imgSrc.split('/').pop().split('?')[0]; // クエリパラメータを除去
    const content = techContent[fileName] || {
      title: 'Default Title',
      description: 'デフォルトの説明'
    };
    tips.innerHTML = `<b>${content.title}</b>${content.description}`;
  });
});

})