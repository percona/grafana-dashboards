# -*- mode: ruby -*-
# vi: set ft=ruby :

def total_cpus
  require 'etc'
  Etc.nprocessors
end


Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.box_check_update = false
  config.vm.synced_folder ".", "/vagrant", type: "nfs"

  if Vagrant.has_plugin?("vagrant-vbguest")
    config.vbguest.auto_update = false
  end

  config.vm.define :clickhouse_grafana do |clickhouse_grafana|
    clickhouse_grafana.vm.network "private_network", ip: "172.16.2.109", nic_type: "virtio"
    clickhouse_grafana.vm.host_name = "local-clickhouse-grafana"
    clickhouse_grafana.vm.network "forwarded_port", guest: 3000, host: 3000
    clickhouse_grafana.vm.network "forwarded_port", guest: 8123, host: 8123
    # vagrant plugin install vagrant-disksize
    clickhouse_grafana.disksize.size = '50GB'
  end

  config.vm.provider "virtualbox" do |vb|
    vb.gui = false
    vb.cpus = total_cpus
    vb.memory = "2048"
    vb.default_nic_type = "virtio"
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end

  config.vm.provision "shell", inline: <<-SHELL
    set -xeuo pipefail
    export DEBIAN_FRONTEND=noninteractive

    apt-get update
    apt-get install --no-install-recommends -y apt-transport-https ca-certificates software-properties-common curl
    apt-get install --no-install-recommends -y htop ethtool mc curl wget jq socat git


    # clickhouse
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E0C56BD4
    echo "deb http://repo.clickhouse.tech/deb/stable/ main/" | tee -a /etc/apt/sources.list.d/clickhouse.list
    apt-get update
    apt-get install --no-install-recommends -y clickhouse-client clickhouse-server

    # grafana
    wget -q -O - https://packages.grafana.com/gpg.key | apt-key add -
    echo "deb https://packages.grafana.com/oss/deb beta main" | tee -a /etc/apt/sources.list.d/grafana.list
    apt-get update
    apt-get install --no-install-recommends -y grafana


    systemctl stop grafana-server
    grafana-cli plugins install vertamedia-clickhouse-datasource 1.9.5
    systemctl start grafana-server
    grafana-cli plugins ls

    echo "GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=vertamedia-clickhouse-datasource" | tee -a /etc/default/grafana-server

    systemctl stop grafana-server
    grafana-cli plugins update vertamedia-clickhouse-datasource
    systemctl start grafana-server
    grafana-cli plugins ls
  SHELL
end
